# VectorShift Project File Structure

## 📁 Complete Directory Layout

```
vectorshift-assessment/
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   │
│   ├── src/
│   │   ├── nodes/                    # Node components
│   │   │   ├── BaseNode.js          # ⭐ NEW - Reusable node abstraction
│   │   │   ├── TextNode.js          # ✏️ ENHANCED - Dynamic sizing + variables
│   │   │   ├── nodeConfigs.js       # ⭐ NEW - All node configurations
│   │   │   └── nodeFactory.js       # ⭐ NEW - Factory pattern
│   │   │
│   │   ├── App.js                   # ✏️ ENHANCED - Main app with styling
│   │   ├── ui.js                    # ✏️ ENHANCED - ReactFlow canvas
│   │   ├── toolbar.js               # ✏️ ENHANCED - Modern node palette
│   │   ├── draggableNode.js         # ✏️ ENHANCED - Beautiful drag components
│   │   ├── submit.js                # ✏️ ENHANCED - Backend integration + modal
│   │   ├── store.js                 # Zustand state (unchanged)
│   │   ├── index.js                 # Entry point (unchanged)
│   │   └── index.css                # Base styles (unchanged)
│   │
│   ├── package.json
│   └── package-lock.json
│
├── backend/
│   ├── main.py                      # ✏️ ENHANCED - FastAPI + DAG detection
│   ├── requirements.txt             # ⭐ NEW - Python dependencies
│   └── __pycache__/
│
├── README.md                        # ⭐ NEW - Complete documentation
└── FILE_STRUCTURE.md               # ⭐ NEW - This file
```

## 📋 File Descriptions

### Frontend Files

#### `/frontend/src/nodes/BaseNode.js` ⭐ NEW
**Purpose:** Reusable node abstraction component
**Key Features:**
- Configuration-driven node rendering
- Supports multiple field types (text, select, textarea, number)
- Dynamic handle positioning
- Customizable styling
- Automatic field value management

**Usage:**
```jsx
<BaseNode id={id} data={data} config={nodeConfig} />
```

#### `/frontend/src/nodes/nodeConfigs.js` ⭐ NEW
**Purpose:** Centralized configuration for all node types
**Contains:**
- Original 4 nodes: Input, Output, LLM, Text
- 5 new nodes: Transform, Condition, Database, API, Aggregator
- Each config includes: title, icon, inputs, outputs, fields, styles

**Adding New Node:**
```javascript
export const nodeConfigs = {
  myNode: {
    title: 'My Node',
    icon: '🎯',
    inputs: [...],
    outputs: [...],
    fields: [...],
    styles: {...}
  }
};
```

#### `/frontend/src/nodes/nodeFactory.js` ⭐ NEW
**Purpose:** Factory pattern for creating node components
**Functions:**
- `createNode(type)` - Creates a single node component
- `generateNodeTypes()` - Generates all node types for ReactFlow

#### `/frontend/src/nodes/TextNode.js` ✏️ ENHANCED
**Original:** Basic text input node
**Enhancements:**
- Dynamic width/height based on content (250-600px width, 120-500px height)
- Variable extraction with regex: `{{variable_name}}`
- Dynamic input handles for each variable
- Visual variable indicators
- Smooth resize transitions

#### `/frontend/src/App.js` ✏️ ENHANCED
**Changes:**
- Added modern styling container
- Full viewport layout
- System font stack

#### `/frontend/src/ui.js` ✏️ ENHANCED
**Changes:**
- Integrated node factory
- Enhanced ReactFlow styling
- Custom minimap colors
- Empty state UI
- Modern background gradient

#### `/frontend/src/toolbar.js` ✏️ ENHANCED
**Changes:**
- Grid layout for nodes
- Header with title and description
- Node count badge
- Passed icons and colors to draggable nodes

#### `/frontend/src/draggableNode.js` ✏️ ENHANCED
**Changes:**
- Gradient backgrounds
- Hover animations
- Drag state visual feedback
- Icon support
- Shadow effects

#### `/frontend/src/submit.js` ✏️ ENHANCED
**Changes:**
- Fetch API integration with backend
- Error handling
- Custom modal for results
- Both alert and modal options
- Styled submit button with animations

### Backend Files

#### `/backend/main.py` ✏️ ENHANCED
**Original:** Basic FastAPI skeleton
**Enhancements:**
- CORS middleware for frontend communication
- Pydantic models for type validation
- POST endpoint for pipeline parsing
- DAG detection using Kahn's algorithm
- Comprehensive error handling
- Additional validation endpoint

**Algorithm: DAG Detection**
```python
def is_directed_acyclic_graph(nodes, edges):
    # 1. Build graph structure
    # 2. Calculate in-degrees
    # 3. Topological sort (Kahn's algorithm)
    # 4. Return True if all nodes processed
```

#### `/backend/requirements.txt` ⭐ NEW
**Purpose:** Python dependencies
**Contents:**
- fastapi - Web framework
- uvicorn - ASGI server
- pydantic - Data validation
- python-multipart - Form data handling

## 🔄 Data Flow

### 1. Node Creation Flow
```
Toolbar → DraggableNode → Drop Event → Store → ReactFlow → NodeFactory → BaseNode/TextNode
```

### 2. Pipeline Submission Flow
```
Submit Button → Collect Nodes/Edges → POST to Backend → DAG Detection → Response → Custom Modal
```

### 3. Variable Detection Flow (Text Node)
```
Text Change → Regex Match → Extract Variables → Update State → Create Handles → Re-render
```

## 🎯 Key Design Decisions

### 1. Node Abstraction Strategy
**Decision:** Configuration-driven approach with BaseNode
**Rationale:**
- Eliminates code duplication
- Easy to add new nodes (just config)
- Consistent behavior across nodes
- Centralized styling

### 2. Text Node Implementation
**Decision:** Separate component with custom logic
**Rationale:**
- Complex variable extraction logic
- Dynamic sizing requirements
- Special rendering needs
- Worth the separation

### 3. Factory Pattern
**Decision:** Use factory to generate node types
**Rationale:**
- ReactFlow needs object mapping
- Clean separation of concerns
- Easy to extend
- Type-safe generation

### 4. Backend Algorithm
**Decision:** Kahn's algorithm for DAG detection
**Rationale:**
- O(V + E) time complexity
- Clear cycle detection
- Industry standard
- Easy to understand

## 📦 Installation Steps

### 1. Clone/Setup
```bash
# Create project directory
mkdir vectorshift-assessment
cd vectorshift-assessment
```

### 2. Frontend Setup
```bash
cd frontend
npm install react reactflow zustand
npm start
```

### 3. Backend Setup
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

## 🧪 Testing Checklist

- [ ] Drag and drop nodes
- [ ] Connect nodes with edges
- [ ] Edit node fields
- [ ] Text node resizes with content
- [ ] Variables detected in text node (use `{{test}}`)
- [ ] Dynamic handles created for variables
- [ ] Submit pipeline
- [ ] Check DAG validation works
- [ ] Try creating a cycle
- [ ] Verify cycle detection works
- [ ] Test all 9 node types
- [ ] Check hover effects
- [ ] Verify minimap colors
- [ ] Test empty state

## 🔧 Configuration

### Adding a New Node Type

1. **Add config** to `nodeConfigs.js`:
```javascript
myNewNode: {
  title: 'New Node',
  icon: '🆕',
  inputs: [{ id: 'in', label: 'Input' }],
  outputs: [{ id: 'out', label: 'Output' }],
  fields: [
    { name: 'field1', type: 'text', defaultValue: '' }
  ],
  styles: { background: 'linear-gradient(...)' }
}
```

2. **Add to toolbar** in `toolbar.js`:
```javascript
{ type: 'myNewNode', label: 'New Node', icon: '🆕', color: '#color' }
```

3. **Done!** The factory will automatically create the component.

## 🎨 Styling Guide

### Color Palette
- **Purple Gradient**: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- **Blue Gradient**: `linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)`
- **Green Gradient**: `linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)`
- **Pink Gradient**: `linear-gradient(135deg, #f093fb 0%, #f5576c 100%)`

### Handle Colors
- **Input Handles**: `#10b981` (Green)
- **Output Handles**: `#f59e0b` (Amber)

### Backgrounds
- **Toolbar**: `linear-gradient(to right, #f8f9fa, #e9ecef)`
- **Canvas**: `linear-gradient(to bottom, #f8f9fa, #ffffff)`

## 📊 Performance Considerations

1. **React Flow** - Optimized for large graphs
2. **Zustand** - Minimal re-renders with shallow comparison
3. **Factory Pattern** - Components created once at startup
4. **DAG Detection** - O(V + E) algorithm, efficient for typical pipelines

## 🚀 Deployment Notes

### Frontend
- Build: `npm run build`
- Serve static files
- Update API endpoint to production URL

### Backend
- Use production ASGI server (gunicorn + uvicorn)
- Set specific CORS origins
- Add authentication if needed
- Enable HTTPS

---

**File structure designed for scalability and maintainability** 🎯