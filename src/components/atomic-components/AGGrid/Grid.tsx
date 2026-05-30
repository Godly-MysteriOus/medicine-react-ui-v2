import React, { useCallback, useState, useRef, useMemo, useEffect } from 'react';
import {useStyles} from './Grid.css';
import { buttonUseStyles } from '../../../utils/CSS/button.styles';
import { AgGridReact, AgGridProvider } from 'ag-grid-react';
import { AllCommunityModule,type ColDef, type RowSelectionOptions } from 'ag-grid-community';
import type {GridApi,GridReadyEvent,SelectionChangedEvent, PaginationChangedEvent} from 'ag-grid-community';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import {createGridLayout, getGridData} from './api';
import type { contextPath } from '../../../utils/makeAPICall/makeAPICall';
import { Button } from '@mui/material';
import { useSelectedRowStore } from './useGridStore';
import './gridStyles.css';
const modules = [AllCommunityModule];

export interface GridProps {
  dataTypeId : string,
  layoutId? : number,
  contextMap : contextPath,
  endpoint : string,
  buttonMap? : Array<React.ReactElement>
  fieldConfigMap?: Record<string, Partial<ColDef> & { field: string }>;
  // Core Configuration
  defaultColDef?: any;
  columnTypes?: { [key: string]: any };
  // renderer
  cellRenderer? : Record<string,any>
  // Selection
  rowSelection?: RowSelectionOptions | 'single' | 'multiple';
  // suppressRowClickSelection?: boolean;
  rowModelType?: 'clientSide' | 'infinite' | 'serverSide';
  suppressCellFocus?: boolean;

  // Pagination
  pagination?: boolean;
  paginationPageSize?: number;
  paginationPageSizeSelector?: number[];

  // Sorting & Filtering
  enableSorting?: boolean;
  enableFilter?: boolean;
  enableAdvancedFilter?: boolean;

  // Row Features
  enableRowDrag?: boolean;
  suppressRowHoverHighlight?: boolean;
  rowHeight?: number;
  headerHeight?: number;

  // Expansion & Grouping
  masterDetail?: boolean;
  detailCellRenderer?: any;
  groupDisplayType?: 'singleColumn' | 'multipleColumns' | 'groupRows' | 'custom';

  // Styling
  // suppressBrowserResizeObserver?: boolean;
  rowClassRules?: { [key: string]: string | ((params: any) => boolean) };
  getRowClass?: (params: any) => string;

  // Events
  onRowClicked?: (event: any) => void;
  onCellClicked?: (event: any) => void;
  onRowDoubleClicked?: (event: any) => void;
  onCellDoubleClicked?: (event: any) => void;

  // Advanced
  animateRows?: boolean;
  suppressPaginationPanel?: boolean;
  suppressMultiSort?: boolean;
  suppressMenuHide?: boolean;
  singleClickEdit?: boolean;
  undoRedoCellEditing?: boolean;
  undoRedoCellEditingLimit?: number;
  suppressClipboardPaste?: boolean;
  suppressFieldDotNotation?: boolean;

  // Module Features
  cellSelection?: boolean;
  enableCharts?: boolean;
  pivotMode?: boolean;
  
  // Custom
  className?: string;
  style?: React.CSSProperties;
  gridTheme?: 'light' | 'dark';
  autoSizeStrategy?: any;
  getRowId?: (params: any) => string;
  onGridSizeChanged?: (params: any) => void;
}

const Grid = React.forwardRef<AgGridReact, GridProps>(
  (
    {
      dataTypeId='',
      layoutId = 1,
      contextMap = 'DEFAULT',
      endpoint = '',
      buttonMap = [],
      fieldConfigMap = {},
      defaultColDef = {},
      columnTypes = {},
      rowModelType = 'infinite',
      rowSelection = {mode:'singleRow',checkboxes:true,enableClickSelection:false},
      // suppressRowClickSelection = false,
      suppressCellFocus = false,
      pagination = true,
      paginationPageSize = 10,
      paginationPageSizeSelector = [10, 20, 50, 100],
      enableSorting = true,
      enableFilter = true,
      enableAdvancedFilter = false,
      enableRowDrag = false,
      suppressRowHoverHighlight = false,
      rowHeight = 35,
      headerHeight = 40,
      masterDetail = false,
      detailCellRenderer = undefined,
      groupDisplayType = 'singleColumn',
      // suppressBrowserResizeObserver = false,
      rowClassRules = {},
      getRowClass = undefined,
      onRowClicked = undefined,
      onCellClicked = undefined,
      onRowDoubleClicked = undefined,
      onCellDoubleClicked = undefined,
      animateRows = true,
      suppressPaginationPanel = false,
      suppressMultiSort = false,
      suppressMenuHide = false,
      singleClickEdit = false,
      undoRedoCellEditing = true,
      undoRedoCellEditingLimit = 20,
      suppressClipboardPaste = false,
      suppressFieldDotNotation = false,
      cellSelection = false,
      enableCharts = false,
      pivotMode = false,
      className = '',
      style = {},
      gridTheme = 'light',
      autoSizeStrategy = undefined,
      getRowId = undefined,
      onGridSizeChanged = undefined,
      cellRenderer = {}
    },
    ref
  ) => {
    const themeClass = gridTheme === 'dark' ? 'ag-theme-quartz-dark' : 'ag-theme-quartz';
    const classes = useStyles();
    const defaultDefaultColDef = {
      sortable: enableSorting,
      filter: enableFilter,
      resizable: true,
      ...defaultColDef,
    };
    const [loading,setLoading] = useState(false);
    const [column,setColumn] = useState<Array<Object>|undefined>([]);
    const gridApiRef = useRef<GridApi|null>(null);
    const [currentPageSize, setCurrentPageSize] = useState(paginationPageSize);
    const setSelectedRows = useSelectedRowStore((state)=>state.setSelectedRows);

    // Sync internal state if prop changes from parent
    useEffect(() => {
      setCurrentPageSize(paginationPageSize);
    }, [paginationPageSize]);

    // Define the datasource for Infinite Row Model
    const dataSource = useMemo(() => ({
      getRows: async (params: any) => {
        const api = gridApiRef.current;
        if (!contextMap || !endpoint || !api) {
          params.successCallback([], 0);
          return;
        }

        // GUARD: Detect stale calls during Page Size changes.
        // If the block range requested by the grid doesn't match the current pagination size,
        // it means the grid is fetching a "stale" block before the configuration update finished.
        const requestedBlockSize = params.endRow - params.startRow;
        const actualPageSize = api.paginationGetPageSize();
        
        if (requestedBlockSize !== actualPageSize) {
          params.successCallback([], 0);
          return;
        }

        try {
          setLoading(true);
          const pageSize:number = params.endRow - params.startRow;
          const pageIndex:number = Math.floor(params.startRow / pageSize);
          // Map AG Grid sort model to your API sort object
          const sortObj = params.sortModel && params.sortModel.length > 0 ? params.sortModel[0] : undefined;

          const { data, totalRecords }: { data: Array<any>, totalRecords: number } = 
            await getGridData(dataTypeId, contextMap, endpoint, params.filterModel || {}, sortObj, pageSize, pageIndex);
          
          params.successCallback(data || [], totalRecords || 0);
        } catch (err) {
          console.error('Error loading grid data:', err);
          params.failCallback();
        } finally {
          setLoading(false);
        }
      }
    }), [dataTypeId, contextMap, endpoint]);

    // initial state when grid is initialized
    const onGridReady = useCallback(async (event:GridReadyEvent)=>{
      try{
        gridApiRef.current = event.api;
        setLoading(true);
        const gridLayout = await createGridLayout(dataTypeId,cellRenderer,fieldConfigMap);
        setColumn(gridLayout);
      }catch(err){
        console.log('Error initializing grid : ',err);
      }finally{
        setLoading(false);
      }
    },[dataTypeId, fieldConfigMap, cellRenderer]);

    // executes when selection is changed
    const onSelectionChanged = (event:SelectionChangedEvent)=>{
      const selectedRow  = event.api.getSelectedRows();
      setSelectedRows(selectedRow);
    }

    // Detect when the user changes the page size in the UI
    const onPaginationChanged = useCallback((event: PaginationChangedEvent) => {
      if (event.newPageSize) {
        // Just update state. The declarative prop update on AgGridReact 
        // will handle the single, correct cache reset.
        setCurrentPageSize(event.api.paginationGetPageSize());
      }
    }, []);

    const handleResetFilters = useCallback(()=>{
      const api = gridApiRef.current;
      if(!api) return;
      api.setFilterModel(null);
    },[]);

    return (
      <div style={{width:'100%'}}>
        <div className={classes.buttonContainer}>
          <div className={classes.passedButton}>{buttonMap.map((item, idx) => React.cloneElement(item, { key: item.key ?? idx }))}</div>
          <div className={classes.predefinedButton}>
            <Button onClick={handleResetFilters} size='small' color='primary' variant='contained' style={buttonUseStyles.root} children={'Reset Filter(s)'}/>
            <Button size='small' color='error' variant='contained' style={buttonUseStyles.root}>Save Layout</Button>
          </div>
        </div>
        <AgGridProvider modules={modules}>
          <div
            className={`${themeClass} ${className} custom-grid-style`}
            style={{
              width: '100%',
              height: '100%',
              ...style,
            }}
          >
            <AgGridReact
              ref={ref}
              columnDefs={column}
              defaultColDef={defaultDefaultColDef}
              columnTypes={columnTypes}
              rowModelType={rowModelType}
              datasource={rowModelType === 'infinite' ? dataSource : undefined}
              rowSelection={rowSelection}
              cacheBlockSize={currentPageSize}
              maxBlocksInCache={1}
              suppressCellFocus={suppressCellFocus}
              pagination={pagination}
              paginationPageSize={currentPageSize}
              paginationPageSizeSelector={paginationPageSizeSelector}
              masterDetail={masterDetail}
              detailCellRenderer={detailCellRenderer}
              groupDisplayType={groupDisplayType}
              // suppressBrowserResizeObserver={suppressBrowserResizeObserver}
              rowClassRules={rowClassRules}
              getRowClass={getRowClass}
              onGridReady={onGridReady}
              onSelectionChanged={onSelectionChanged}
              onRowClicked={onRowClicked}
              onPaginationChanged={onPaginationChanged}
              onCellClicked={onCellClicked}
              onRowDoubleClicked={onRowDoubleClicked}
              onCellDoubleClicked={onCellDoubleClicked}
              animateRows={animateRows}
              suppressPaginationPanel={suppressPaginationPanel}
              suppressMultiSort={suppressMultiSort}
              suppressMenuHide={suppressMenuHide}
              singleClickEdit={singleClickEdit}
              undoRedoCellEditing={undoRedoCellEditing}
              undoRedoCellEditingLimit={undoRedoCellEditingLimit}
              suppressClipboardPaste={suppressClipboardPaste}
              suppressFieldDotNotation={suppressFieldDotNotation}
              cellSelection={cellSelection}
              enableCharts={enableCharts}
              pivotMode={pivotMode}
              autoSizeStrategy={autoSizeStrategy}
              getRowId={getRowId}
              onGridSizeChanged={onGridSizeChanged}
              rowHeight={rowHeight}
              headerHeight={headerHeight}
              loading={loading}
              enableAdvancedFilter = {enableAdvancedFilter}
              rowDragEntireRow = {enableRowDrag}
              suppressRowHoverHighlight = {suppressRowHoverHighlight}
            />
        </div>
      </AgGridProvider>
      </div>
    );
  }
);

Grid.displayName = 'Grid';

export default Grid;
