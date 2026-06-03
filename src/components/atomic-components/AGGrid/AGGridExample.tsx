/**
 * AG Grid Component - Example & Documentation
 * 
 * This file demonstrates how to use the Grid component with various
 * columnDef configurations and AGGrid props.
 */

import React, { useRef, useState } from 'react';
import type { ColDef } from 'ag-grid-community';
import Grid, {type GridProps } from './Grid';

// ============================================================================
// COLUMN DEFINITION (colDef) - All Supported Keys
// ============================================================================
/**
 * Column Definition (colDef) supports the following keys:
 * 
 * BASIC PROPERTIES:
 * - field: string - The field name from row data (e.g., 'firstName')
 * - headerName: string - Display name for the column header
 * - type: string | string[] - Column type: 'number', 'text', 'boolean', 'date', etc.
 * - width: number - Fixed column width in pixels
 * - flex: number - Flexible width (proportion relative to other flex columns)
 * - minWidth: number - Minimum column width
 * - maxWidth: number - Maximum column width
 * - hide: boolean - Initially hide the column
 * - colId: string - Unique column identifier (auto-generated if not provided)
 * 
 * SORTING & FILTERING:
 * - sortable: boolean - Enable/disable sorting
 * - sort: 'asc' | 'desc' - Initial sort direction
 * - sortIndex: number - Multi-column sort order
 * - filter: boolean | string - Enable filtering ('agTextColumnFilter', 'agNumberColumnFilter', etc.)
 * - filterParams: object - Custom filter parameters
 * - suppressMenu: boolean - Hide the column menu
 * - suppressFiltersToolPanel: boolean - Hide from filters panel
 * 
 * RENDERING:
 * - cellRenderer: string | Function | React.Component - Custom cell rendering
 * - cellRendererParams: object - Parameters passed to cell renderer
 * - headerComponent: string | Function - Custom header component
 * - headerComponentParams: object - Parameters for header component
 * - cellStyle: object | Function - Inline styles for cells
 * - cellClassRules: object - CSS class rules for cells
 * - cellClass: string | Function - CSS classes for cells
 * - headerClass: string - CSS class for header
 * 
 * EDITING:
 * - editable: boolean | Function - Enable cell editing
 * - cellEditor: string | Function - Custom cell editor component
 * - cellEditorParams: object - Parameters for cell editor
 * - onCellValueChanged: Function - Callback when cell value changes
 * - valueSetter: Function - Custom value setter function
 * - valueGetter: Function - Custom value getter function
 * - suppressKeyboardEvent: Function - Suppress keyboard events
 * 
 * FORMATTING & DISPLAY:
 * - valueFormatter: Function - Format cell display value
 * - valueParser: Function - Parse input value
 * - tooltipField: string - Field to display in tooltip
 * - tooltipValueGetter: Function - Custom tooltip getter
 * - tooltipComponent: string | Function - Custom tooltip component
 * - showRowGroup: string - Show group information
 * 
 * PINNING & GROUPING:
 * - pinned: 'left' | 'right' - Pin column to left or right
 * - rowGroup: boolean - Use for row grouping
 * - rowGroupIndex: number - Row grouping priority
 * - pivot: boolean - Use for pivot functionality
 * - pivotIndex: number - Pivot priority
 * - aggFunc: string | Function - Aggregation function
 * 
 * SIZING & RESIZING:
 * - resizable: boolean - Allow column resizing
 * - suppressSizeToFit: boolean - Exclude from auto-size
 * - suppressAutoSize: boolean - Disable auto-sizing
 * - autoHeaderHeight: boolean - Auto-adjust header height
 * 
 * SELECTION & INTERACTION:
 * - checkboxSelection: boolean | Function - Show checkbox for selection
 * - headerCheckboxSelection: boolean - Show checkbox in header
 * - headerCheckboxSelectionFilteredOnly: boolean - Checkbox only for filtered rows
 * - suppressNavigable: boolean - Exclude from keyboard navigation
 * - suppressMovable: boolean - Prevent column dragging
 * - suppressPaste: boolean - Disable paste for this column
 * 
 * EVENTS:
 * - onCellClicked: Function - Cell click handler
 * - onCellDoubleClicked: Function - Cell double-click handler
 * - onCellContextMenu: Function - Right-click handler
 * - onColumnValueChanged: Function - When column value changes
 */

// ============================================================================
// EXAMPLE: BASIC GRID WITH SIMPLE DATA
// ============================================================================
import { AgGridReact } from 'ag-grid-react';
// ...existing code...
const BasicGridExample = () => {
  const gridRef = useRef<AgGridReact>(null);
  
  const columnDefs: ColDef[] = [
    { 
      field: 'id', 
      headerName: 'ID',
      width: 70,
      filter: 'agNumberColumnFilter'
    },
    { 
      field: 'firstName', 
      headerName: 'First Name',
      flex: 1,
      filter: 'agTextColumnFilter'
    },
    { 
      field: 'lastName', 
      headerName: 'Last Name',
      flex: 1
    },
    { 
      field: 'age', 
      headerName: 'Age',
      width: 80,
      filter: 'agNumberColumnFilter'
    },
    { 
      field: 'email', 
      headerName: 'Email',
      flex: 1.5
    },
  ];

  const rowData = [
    { id: 1, firstName: 'John', lastName: 'Doe', age: 28, email: 'john@example.com' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', age: 34, email: 'jane@example.com' },
    { id: 3, firstName: 'Bob', lastName: 'Johnson', age: 45, email: 'bob@example.com' },
  ];

  const gridProps: GridProps = {
    rowData,
    columnDefs,
    pagination: true,
    paginationPageSize: 10,
    enableSorting: true,
    enableFilter: true,
  };

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <h2>Basic Grid Example</h2>
      <Grid ref={gridRef} {...gridProps} />
    </div>
  );
};

// ============================================================================
// EXAMPLE: ADVANCED GRID WITH CUSTOM RENDERERS
// ============================================================================
const AdvancedGridExample = () => {
  const gridRef = useRef<AgGridReact>(null);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  // Custom cell renderer for status badge
  const StatusRenderer = (props: any) => {
    const status = props.value;
    const colors: { [key: string]: string } = {
      active: '#00b050',
      inactive: '#ff0000',
      pending: '#ffc000',
    };
    return (
      <div
        style={{
          backgroundColor: colors[status] || '#ccc',
          color: 'white',
          padding: '5px 10px',
          borderRadius: '4px',
          textAlign: 'center',
          fontWeight: 'bold',
        }}
      >
        {status?.toUpperCase() || 'N/A'}
      </div>
    );
  };

  // Custom cell renderer for actions
  const ActionRenderer = (props: any) => (
    <div style={{ display: 'flex', gap: '5px' }}>
      <button onClick={() => alert(`Edit: ${props.data.id}`)}>Edit</button>
      <button onClick={() => alert(`Delete: ${props.data.id}`)}>Delete</button>
    </div>
  );

  const columnDefs: ColDef[] = [
    {
      field: 'checkbox',
      headerName: '',
      checkboxSelection: true,
      headerCheckboxSelection: true,
      width: 50,
      sortable: false,
      filter: false,
    },
    { 
      field: 'id', 
      headerName: 'ID',
      width: 70,
      pinned: 'left',
      filter: 'agNumberColumnFilter'
    },
    { 
      field: 'name', 
      headerName: 'User Name',
      flex: 1,
      filter: 'agTextColumnFilter'
    },
    { 
      field: 'status', 
      headerName: 'Status',
      width: 120,
      cellRenderer: StatusRenderer,
      filter: 'agTextColumnFilter'
    },
    { 
      field: 'joinDate', 
      headerName: 'Join Date',
      width: 120,
      valueFormatter: (params: any) => {
        if (!params.value) return '';
        const date = new Date(params.value);
        return date.toLocaleDateString();
      },
      filter: 'agDateColumnFilter'
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      cellRenderer: ActionRenderer,
      sortable: false,
      filter: false,
    }
  ];

  const rowData = [
    { id: 1, name: 'Alice Brown', status: 'active', joinDate: '2023-01-15' },
    { id: 2, name: 'Bob Wilson', status: 'inactive', joinDate: '2023-02-20' },
    { id: 3, name: 'Charlie Davis', status: 'pending', joinDate: '2023-03-10' },
  ];

  const handleSelectionChanged = () => {
    // Safely access grid API
    const selected = gridRef.current?.api?.getSelectedRows?.() || [];
    setSelectedRows(selected);
  };

  const gridProps: GridProps = {
    rowData,
    columnDefs,
    rowSelection: 'multiple',
    pagination: true,
    paginationPageSize: 10,
    enableSorting: true,
    enableFilter: true,
    animateRows: true,
    suppressMultiSort: false,
    onSelectionChanged: handleSelectionChanged,
    defaultColDef: {
      sortable: true,
      filter: true,
      resizable: true,
    }
  };

  return (
    <div>
      <h2>Advanced Grid Example</h2>
      <p>Selected Rows: {selectedRows.length}</p>
      <div style={{ height: '500px', width: '100%' }}>
        <Grid ref={gridRef} {...gridProps} />
      </div>
    </div>
  );
};

// ============================================================================
// EXAMPLE: GRID WITH EDITABLE CELLS
// ============================================================================
const EditableGridExample = () => {
  const gridRef = useRef<AgGridReact>(null);
  const [rowData, setRowData] = useState([
    { id: 1, product: 'Laptop', price: 999, quantity: 5 },
    { id: 2, product: 'Mouse', price: 25, quantity: 50 },
    { id: 3, product: 'Keyboard', price: 75, quantity: 20 },
  ]);

  const columnDefs: ColDef[] = [
    { 
      field: 'id', 
      headerName: 'ID',
      width: 70,
      editable: false
    },
    { 
      field: 'product', 
      headerName: 'Product Name',
      flex: 1,
      editable: true,
      cellEditor: 'agTextCellEditor'
    },
    { 
      field: 'price', 
      headerName: 'Price ($)',
      width: 120,
      editable: true,
      cellEditor: 'agNumberCellEditor',
      valueFormatter: (params: any) => `$${params.value?.toFixed(2) || '0.00'}`
    },
    { 
      field: 'quantity', 
      headerName: 'Quantity',
      width: 120,
      editable: true,
      cellEditor: 'agNumberCellEditor'
    },
  ];

  const handleCellValueChanged = (event: any) => {
    console.log('Cell changed:', event.data);
    // Update rowData with new value
    setRowData([...rowData]);
  };

  const gridProps: GridProps = {
    rowData,
    columnDefs,
    singleClickEdit: true,
    undoRedoCellEditing: true,
    undoRedoCellEditingLimit: 20,
    onCellClicked: handleCellValueChanged,
    defaultColDef: {
      sortable: true,
      resizable: true,
    }
  };

  return (
    <div>
      <h2>Editable Grid Example</h2>
      <p>Click on cells to edit (single-click edit mode)</p>
      <div style={{ height: '400px', width: '100%' }}>
        <Grid ref={gridRef} {...gridProps} />
      </div>
    </div>
  );
};

// ============================================================================
// EXAMPLE: GRID WITH ROW STYLING & CUSTOM CLASSES
// ============================================================================
const StyledGridExample = () => {
  const gridRef = useRef<AgGridReact>(null);

  const columnDefs: ColDef[] = [
    { 
      field: 'id', 
      headerName: 'ID',
      width: 70
    },
    { 
      field: 'name', 
      headerName: 'Name',
      flex: 1
    },
    { 
      field: 'score', 
      headerName: 'Score',
      width: 100,
      filter: 'agNumberColumnFilter'
    },
  ];

  const rowData = [
    { id: 1, name: 'John', score: 85 },
    { id: 2, name: 'Jane', score: 95 },
    { id: 3, name: 'Bob', score: 60 },
    { id: 4, name: 'Alice', score: 90 },
  ];

  const gridProps: GridProps = {
    rowData,
    columnDefs,
    rowClassRules: {
      'high-score': (params: any) => params.data.score >= 90,
      'medium-score': (params: any) => params.data.score >= 70 && params.data.score < 90,
      'low-score': (params: any) => params.data.score < 70,
    },
    style: {
      '--ag-background-color': '#f9f9f9',
    } as React.CSSProperties & { [key: string]: string }
  };

  return (
    <div>
      <h2>Styled Grid Example</h2>
      <style>{`
        .ag-row.high-score { background-color: #d4edda; }
        .ag-row.medium-score { background-color: #fff3cd; }
        .ag-row.low-score { background-color: #f8d7da; }
      `}</style>
      <div style={{ height: '400px', width: '100%' }}>
        <Grid ref={gridRef} {...gridProps} />
      </div>
    </div>
  );
};

// ============================================================================
// COMPLETE PROPS DOCUMENTATION
// ============================================================================
/**
 * AGGRID PROPS - All Supported Properties
 * 
 * DATA PROPERTIES:
 * - rowData: any[] - Array of row data objects
 * - columnDefs: any[] - Array of column definitions
 * - defaultColDef: object - Default properties for all columns
 * - columnTypes: object - Reusable column type definitions
 * - getRowId: Function - Custom row identifier getter
 * 
 * SELECTION PROPERTIES:
 * - rowSelection: 'single' | 'multiple' - Selection mode
 * - suppressRowClickSelection: boolean - Disable row selection on click
 * - suppressCellFocus: boolean - Disable cell focus outline
 * 
 * PAGINATION:
 * - pagination: boolean - Enable pagination
 * - paginationPageSize: number - Rows per page (default: 10)
 * - paginationPageSizeSelector: number[] - Available page size options
 * - suppressPaginationPanel: boolean - Hide pagination controls
 * 
 * SORTING & FILTERING:
 * - enableSorting: boolean - Enable column sorting
 * - enableFilter: boolean - Enable column filtering
 * - enableAdvancedFilter: boolean - Enable advanced filter UI
 * - suppressMultiSort: boolean - Disable multi-column sorting
 * 
 * ROW FEATURES:
 * - enableRowDrag: boolean - Allow row dragging
 * - suppressRowHoverHighlight: boolean - Disable hover effect
 * - rowHeight: number - Default row height in pixels
 * - headerHeight: number - Header height in pixels
 * - masterDetail: boolean - Enable master-detail view
 * - detailCellRenderer: Function - Custom detail row renderer
 * 
 * STYLING:
 * - gridTheme: 'light' | 'dark' - Color theme
 * - className: string - Custom CSS classes
 * - style: object - Inline styles
 * - rowClassRules: object - Conditional CSS classes for rows
 * - getRowClass: Function - Dynamic row class getter
 * 
 * EDITING:
 * - singleClickEdit: boolean - Edit on single click
 * - undoRedoCellEditing: boolean - Enable undo/redo
 * - undoRedoCellEditingLimit: number - Undo/redo history size
 * - suppressClipboardPaste: boolean - Disable paste functionality
 * 
 * ADVANCED:
 * - animateRows: boolean - Animate row changes
 * - suppressMenuHide: boolean - Keep context menu visible
 * - suppressFieldDotNotation: boolean - Disable dot notation in field names
 * - enableRangeSelection: boolean - Enable range selection
 * - enableCharts: boolean - Enable charting
 * - pivotMode: boolean - Enable pivot mode
 * - autoSizeStrategy: object - Auto-sizing configuration
 * 
 * EVENT HANDLERS:
 * - onGridReady: Function(event) - Called when grid is initialized
 * - onSelectionChanged: Function(event) - When selection changes
 * - onRowClicked: Function(event) - When row is clicked
 * - onCellClicked: Function(event) - When cell is clicked
 * - onRowDoubleClicked: Function(event) - When row is double-clicked
 * - onCellDoubleClicked: Function(event) - When cell is double-clicked
 * - onSortChanged: Function(event) - When sort changes
 * - onFilterChanged: Function(event) - When filter changes
 * - onPaginationChanged: Function(event) - When page changes
 * - onGridSizeChanged: Function(event) - When grid size changes
 */

// ============================================================================
// MAIN COMPONENT SHOWCASING ALL EXAMPLES
// ============================================================================
export const AGGridExamples = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>AG Grid Component Examples</h1>
      
      <section style={{ marginBottom: '40px' }}>
        <BasicGridExample />
      </section>

      <section style={{ marginBottom: '40px' }}>
        <AdvancedGridExample />
      </section>

      <section style={{ marginBottom: '40px' }}>
        <EditableGridExample />
      </section>

      <section style={{ marginBottom: '40px' }}>
        <StyledGridExample />
      </section>
    </div>
  );
};

export default AGGridExamples;
