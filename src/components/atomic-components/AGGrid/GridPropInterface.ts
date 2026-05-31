import {type ColDef, type RowSelectionOptions } from 'ag-grid-community';
import type { contextPath } from '../../../utils/makeAPICall/makeAPICall';
import React from 'react';
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