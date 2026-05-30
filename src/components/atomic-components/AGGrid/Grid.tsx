import React, { useCallback, useState, useRef } from 'react';
import {useStyles} from './Grid.css';
import { buttonUseStyles } from '../../../utils/CSS/button.styles';
import { AgGridReact, AgGridProvider } from 'ag-grid-react';
import { AllCommunityModule,type ColDef, type RowSelectionOptions } from 'ag-grid-community';
import type {GridApi,GridReadyEvent,FilterChangedEvent,SortChangedEvent,SelectionChangedEvent, PaginationChangedEvent} from 'ag-grid-community';
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
    const [gridData,setGridData] = useState<Array<Object>|undefined>([]);
    const gridApiRef = useRef<GridApi|null>(null);
    const setSelectedRows = useSelectedRowStore((state)=>state.setSelectedRows);
    // method is use to make API call based on filter, sortObj and endpoint
    const loadGridData = useCallback(async(gridApi?:GridApi)=>{
      const api = gridApi || gridApiRef.current;
      if(!api || !contextMap || !endpoint) return;
      try{
        setLoading(true);
        const filterModel = api.getFilterModel();
        const sortedCol = api.getColumnState().find((col)=>col.sort!=null);
        const sortObj = sortedCol ? {colId:sortedCol.colId,sort:sortedCol.sort} : undefined;
        const {data,totalRecords}:{data:Array<any>,totalRecords:number} = await getGridData(dataTypeId,contextMap,endpoint,filterModel||{},sortObj,api.paginationGetPageSize(),api.paginationGetCurrentPage());
        if(data){
          setGridData(data);
        }
      }catch(err){
        console.log('Error loading grid data : ',err);
        setGridData([]);
      }finally{
        setLoading(false);
      }
    },[contextMap,endpoint]);


    // initial state when grid is initialized
    const onGridReady = useCallback(async (event:GridReadyEvent)=>{
      try{
        gridApiRef.current = event.api;
        setLoading(true);
        const gridLayout = await createGridLayout(dataTypeId,cellRenderer,fieldConfigMap);
        setColumn(gridLayout);
        // will trigger API call to load data;
        await loadGridData(event.api);
      }catch(err){
        console.log('Error initializing grid : ',err);
      }finally{
        setLoading(false);
      }
    },[dataTypeId,layoutId,fieldConfigMap,loadGridData]);


    // executes when filter is changed
    const onFilterChanged = useCallback(
      async(_event:FilterChangedEvent)=>{
        await loadGridData();
      }
    ,[loadGridData]);


    // executes when sort is applied
    const onSortChanged = useCallback(
      async(_event:SortChangedEvent)=>{
        await loadGridData();
      }
    ,[loadGridData]);

    // on PaginationChange executes when paginationChanges
    const onPaginationChanged = useCallback((event: PaginationChangedEvent) => {
      // Prevent infinite loop: Only reload if the user navigated to a new page or changed page size.
      if (event.newPage || event.newPageSize) {
        loadGridData();
      }
    }, []);
    // executes when selection is changed
    const onSelectionChanged = (event:SelectionChangedEvent)=>{
      const selectedRow  = event.api.getSelectedRows();
      setSelectedRows(selectedRow);
    }

    const handleResetFilters = useCallback(async()=>{
      const api = gridApiRef.current;
      if(!api) return;
      api.setFilterModel(null);
      await loadGridData();
    },[loadGridData]);
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
              rowData={gridData}
              columnDefs={column}
              defaultColDef={defaultDefaultColDef}
              columnTypes={columnTypes}
              rowSelection={rowSelection}
              // suppressRowClickSelection={suppressRowClickSelection}
              suppressCellFocus={suppressCellFocus}
              pagination={pagination}
              paginationPageSize={paginationPageSize}
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
              onCellClicked={onCellClicked}
              onSortChanged={onSortChanged}
              onFilterChanged={onFilterChanged}
              onRowDoubleClicked={onRowDoubleClicked}
              onCellDoubleClicked={onCellDoubleClicked}
              onPaginationChanged={onPaginationChanged}
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
