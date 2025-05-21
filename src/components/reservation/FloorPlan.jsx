import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getIcon } from '../../utils/iconUtils';
import { TABLE_SHAPES, RESTAURANT_SECTIONS } from '../../utils/restaurantData';

const ZoomInIcon = getIcon('zoom-in');
const ZoomOutIcon = getIcon('zoom-out');
const MoveIcon = getIcon('move');
const InfoIcon = getIcon('info');
const UsersIcon = getIcon('users');

function FloorPlan({ tables, selectedTable, onSelectTable, partySize }) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [showLegend, setShowLegend] = useState(false);
  const containerRef = useRef(null);
  
  // Handle zoom in/out
  const handleZoom = (direction) => {
    setScale(prev => {
      const newScale = direction === 'in' ? prev * 1.2 : prev / 1.2;
      // Limit zoom levels
      return Math.min(Math.max(newScale, 0.5), 2);
    });
  };
  
  // Start dragging the floor plan
  const handleDragStart = (e) => {
    if (e.type === 'touchstart') {
      setStartPos({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y
      });
    } else {
      setStartPos({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
    setIsDragging(true);
  };
  
  // Update position while dragging
  const handleDragMove = (e) => {
    if (!isDragging) return;
    
    if (e.type === 'touchmove') {
      setPosition({
        x: e.touches[0].clientX - startPos.x,
        y: e.touches[0].clientY - startPos.y
      });
    } else {
      setPosition({
        x: e.clientX - startPos.x,
        y: e.clientY - startPos.y
      });
    }
  };
  
  // End dragging
  const handleDragEnd = () => {
    setIsDragging(false);
  };
  
  // Add and remove event listeners for dragging
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const handleMouseMove = (e) => handleDragMove(e);
    const handleTouchMove = (e) => handleDragMove(e);
    const handleMouseUp = () => handleDragEnd();
    const handleTouchEnd = () => handleDragEnd();
    
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchend', handleTouchEnd);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging]);
  
  // Reset position and scale
  const resetView = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };
  
  // Render different table shapes
  const renderTable = (table) => {
    const isSelected = selectedTable && selectedTable.id === table.id;
    const isAvailable = table.available;
    const isSuitable = table.suitable;
    
    // Define styling based on state
    let tableClass = 'absolute transition-all duration-200 cursor-pointer ';
    
    if (isSelected) {
      tableClass += 'ring-2 ring-primary ring-offset-2 z-10 ';
    }
    
    if (!isAvailable) {
      tableClass += 'opacity-40 cursor-not-allowed ';
    } else if (!isSuitable) {
      tableClass += 'opacity-70 bg-yellow-50 dark:bg-yellow-900/20 ';
    }
    
    switch (table.shape) {
      case TABLE_SHAPES.ROUND:
        return (
          <div 
            key={table.id}
            className={`${tableClass} rounded-full bg-white dark:bg-surface-700 border-2 border-surface-300 dark:border-surface-600 flex items-center justify-center`}
            style={{ 
              width: '40px', 
              height: '40px',
              left: `${table.x}px`,
              top: `${table.y}px`
            }}
            onClick={() => isAvailable && onSelectTable(table)}
          >
            <span className="text-xs font-medium">{table.seats}</span>
          </div>
        );
        
      case TABLE_SHAPES.RECTANGLE:
        return (
          <div 
            key={table.id}
            className={`${tableClass} rounded-md bg-white dark:bg-surface-700 border-2 border-surface-300 dark:border-surface-600 flex items-center justify-center`}
            style={{ 
              width: '60px', 
              height: '36px',
              left: `${table.x}px`,
              top: `${table.y}px`
            }}
            onClick={() => isAvailable && onSelectTable(table)}
          >
            <span className="text-xs font-medium">{table.seats}</span>
          </div>
        );
        
      case TABLE_SHAPES.BOOTH:
        return (
          <div 
            key={table.id}
            className={`${tableClass} rounded-t-none rounded-b-xl bg-white dark:bg-surface-700 border-2 border-t-0 border-surface-300 dark:border-surface-600 flex items-center justify-center`}
            style={{ 
              width: '45px', 
              height: '32px',
              left: `${table.x}px`,
              top: `${table.y}px`
            }}
            onClick={() => isAvailable && onSelectTable(table)}
          >
            <span className="text-xs font-medium">{table.seats}</span>
          </div>
        );
        
      default:
        return (
          <div 
            key={table.id}
            className={`${tableClass} rounded-md bg-white dark:bg-surface-700 border-2 border-surface-300 dark:border-surface-600 flex items-center justify-center`}
            style={{ 
              width: '30px', 
              height: '30px',
              left: `${table.x}px`,
              top: `${table.y}px`
            }}
            onClick={() => isAvailable && onSelectTable(table)}
          >
            <span className="text-xs font-medium">{table.seats}</span>
          </div>
        );
    }
  };
  
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <button 
            className="p-1 text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg"
            onClick={() => setShowLegend(!showLegend)}
          >
            <InfoIcon className="w-5 h-5" />
          </button>
          <span className="ml-2 text-sm font-medium">Floor Plan</span>
        </div>
        
        <div className="flex items-center space-x-1">
          <button 
            className="p-1 text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg"
            onClick={() => handleZoom('out')}
          >
            <ZoomOutIcon className="w-5 h-5" />
          </button>
          <button 
            className="p-1 text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg"
            onClick={resetView}
          >
            <MoveIcon className="w-5 h-5" />
          </button>
          <button 
            className="p-1 text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg"
            onClick={() => handleZoom('in')}
          >
            <ZoomInIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {/* Floor plan container */}
      <div 
        ref={containerRef}
        className={`relative w-full h-[400px] border rounded-lg bg-surface-50 dark:bg-surface-900 overflow-hidden ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
      >
        {/* Floor plan sections */}
        <div className="w-full h-full">
          <motion.div
            style={{
              scale,
              x: position.x,
              y: position.y
            }}
            className="origin-center absolute inset-0"
          >
            <div className="relative w-full h-full">
              {/* Render restaurant sections */}
              <div className="absolute top-10 left-10 text-xs text-surface-500 dark:text-surface-400">Main Dining</div>
              <div className="absolute top-30 left-10 right-10 h-[300px] border border-dashed border-surface-300 dark:border-surface-600 rounded-lg"></div>
              
              <div className="absolute top-380 left-10 text-xs text-surface-500 dark:text-surface-400">Patio</div>
              <div className="absolute top-400 left-10 right-10 h-[120px] border border-dashed border-surface-300 dark:border-surface-600 rounded-lg"></div>
              
              <div className="absolute top-200 right-30 text-xs text-surface-500 dark:text-surface-400">Bar</div>
              <div className="absolute top-200 right-10 w-[50px] h-[180px] border border-dashed border-surface-300 dark:border-surface-600 rounded-lg"></div>
              
              <div className="absolute top-530 left-10 text-xs text-surface-500 dark:text-surface-400">Private Room</div>
              <div className="absolute top-550 left-200 w-[120px] h-[60px] border border-dashed border-surface-300 dark:border-surface-600 rounded-lg"></div>
              
              {/* Render tables */}
              {tables.map(table => renderTable(table))}
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Legend */}
      {showLegend && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 p-3 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-lg text-sm"
        >
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium">Legend</h4>
            <button 
              className="text-surface-500 dark:text-surface-400 hover:text-surface-700 dark:hover:text-surface-200"
              onClick={() => setShowLegend(false)}
            >
              <span className="text-xs">Close</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="flex items-center">
              <div className="w-5 h-5 rounded-full border-2 border-surface-300 dark:border-surface-600 mr-2"></div>
              <span>Round Table</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-4 rounded-md border-2 border-surface-300 dark:border-surface-600 mr-2"></div>
              <span>Rectangular Table</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-4 rounded-t-none rounded-b-lg border-2 border-t-0 border-surface-300 dark:border-surface-600 mr-2"></div>
              <span>Booth</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-md border-2 border-surface-300 dark:border-surface-600 mr-2"></div>
              <span>Bar Seating</span>
            </div>
          </div>
          
          <div className="mt-2 pt-2 border-t border-surface-200 dark:border-surface-700">
            <div className="flex items-center text-primary font-medium">
              <UsersIcon className="w-4 h-4 mr-1" /> 
              <span>Party size: {partySize}</span>
            </div>
            <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">
              Tables that are too small for your party are shown in yellow. Unavailable tables are grayed out.
            </p>
          </div>
        </motion.div>
      )}
      
      {/* Table details */}
      {selectedTable && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 p-3 bg-primary-light/10 dark:bg-primary-dark/20 border border-primary/20 rounded-lg"
        >
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium">{selectedTable.name}</h4>
              <p className="text-sm text-surface-600 dark:text-surface-300">
                {RESTAURANT_SECTIONS.find(section => section.id === selectedTable.area)?.name || selectedTable.area}
              </p>
            </div>
            <div className="bg-white dark:bg-surface-800 px-2 py-1 rounded border border-surface-200 dark:border-surface-700">
              <div className="flex items-center text-sm">
                <UsersIcon className="w-4 h-4 mr-1 text-primary" />
                <span>{selectedTable.seats} seats</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default FloorPlan;