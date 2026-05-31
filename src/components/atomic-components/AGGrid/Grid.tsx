import React, { useCallback, useState, useRef, useMemo, useEffect } from 'react';
import { useStyles } from './Grid.css';
import { buttonUseStyles } from '../../../utils/CSS/button.styles';
import { AgGridReact, AgGridProvider } from 'ag-grid-react';
import { AllCommunityModule } from 'ag-grid-community';
import type {
  GridApi,
  GridReadyEvent,
  SelectionChangedEvent,
  PaginationChangedEvent,
  ColDef,
  ColGroupDef,
} from 'ag-grid-community';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { createGridLayout, getGridData } from './api';
import { Button } from '@mui/material';
import { useSelectedRowStore } from './useGridStore';
import './gridStyles.css';

const modules = [AllCommunityModule];
import type { GridProps } from './GridPropInterface';

const Grid = React.forwardRef<AgGridReact, GridProps>(
  (props, ref) => {
    const {
      dataTypeId = '',
      layoutId = 1,
      contextMap = 'DEFAULT',
      endpoint = '',
      buttonMap = [],
      fieldConfigMap = {},
      defaultColDef = {},
      columnTypes = {},
      rowModelType = 'infinite',
      rowSelection = { mode: 'singleRow', checkboxes: true, enableClickSelection: false },
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
    } = props;

    const classes = useStyles();
    const setSelectedRows = useSelectedRowStore((state) => state.setSelectedRows);

    // -- State & Refs --
    const [loading, setLoading] = useState(false);
    const [columns, setColumns] = useState<(ColDef | ColGroupDef)[]>([]);
    const [currentPageSize, setCurrentPageSize] = useState(paginationPageSize);
    const gridApiRef = useRef<GridApi | null>(null);

    // -- Derived Config --
    const themeClass = gridTheme === 'dark' ? 'ag-theme-quartz-dark' : 'ag-theme-quartz';

    const defaultDefaultColDef = {
      sortable: enableSorting,
      filter: enableFilter,
      resizable: true,
      ...defaultColDef,
    };

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

        const pageSize: number = params.endRow - params.startRow;
        // Guard: Ignore stale calls where the requested block size doesn't match the current UI page size
        if (pageSize !== api.paginationGetPageSize()) {
          params.failCallback();
          return;
        }

        try {
          setLoading(true);
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
    }), [dataTypeId, contextMap, endpoint, currentPageSize]);

    // initial state when grid is initialized
    const onGridReady = useCallback(async (event: GridReadyEvent) => {
      try {
        gridApiRef.current = event.api;
        setLoading(true);
        const gridLayout = await createGridLayout(dataTypeId, cellRenderer, fieldConfigMap);
        setColumns(gridLayout||[]);
      } catch (err) {
        console.error('Error initializing grid:', err);
      } finally {
        setLoading(false);
      }
    }, [dataTypeId, fieldConfigMap, cellRenderer]);

    // executes when selection is changed
    const onSelectionChanged = useCallback((event: SelectionChangedEvent) => {
      const selectedRow = event.api.getSelectedRows();
      setSelectedRows(selectedRow);
    }, [setSelectedRows]);

    // Detect when the user changes the page size in the UI
    const onPaginationChanged = useCallback((event: PaginationChangedEvent) => {
      if (event.newPageSize) {
        setCurrentPageSize(event.api.paginationGetPageSize());
      }
    }, []);

    const handleResetFilters = useCallback(() => {
      gridApiRef.current?.setFilterModel(null);
    }, []);

    return (
      <div style={{ width: '100%' }}>
        <div className={classes.buttonContainer}>
          <div className={classes.passedButton}>
            {buttonMap.map((item, idx) => React.cloneElement(item, { key: item.key ?? idx }))}
          </div>
          <div className={classes.predefinedButton}>
            <Button
              onClick={handleResetFilters}
              size="small"
              color="primary"
              variant="contained"
              style={buttonUseStyles.root}
              children="Reset Filter(s)"
            />
            <Button size="small" color="error" variant="contained" style={buttonUseStyles.root}>
              Save Layout
            </Button>
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
              columnDefs={columns}
              defaultColDef={defaultDefaultColDef}
              columnTypes={columnTypes}
              rowModelType={rowModelType}
              datasource={rowModelType === 'infinite' ? dataSource : undefined}
              rowSelection={rowSelection}
              paginationPageSize={currentPageSize}
              cacheBlockSize={currentPageSize}
              maxBlocksInCache={1}
              suppressCellFocus={suppressCellFocus}
              pagination={pagination}
              paginationPageSizeSelector={paginationPageSizeSelector}
              masterDetail={masterDetail}
              detailCellRenderer={detailCellRenderer}
              groupDisplayType={groupDisplayType}
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
              enableAdvancedFilter={enableAdvancedFilter}
              rowDragEntireRow={enableRowDrag}
              suppressRowHoverHighlight={suppressRowHoverHighlight}
            />
        </div>
      </AgGridProvider>
      </div>
    );
  }
);

Grid.displayName = 'Grid';

export default Grid;
