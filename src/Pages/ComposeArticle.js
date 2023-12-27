import { useState, useRef, useEffect } from 'react';


export default function ComposeArticle(){
  const [editableContent, setEditableContent] = useState('');
  const [fontSize, setFontSize] = useState('3'); // Default to 16px
  const [alignment, setAlignment] = useState('Center'); // Default alignment
  const editorRef = useRef(null);
  const fontSizeRef = useRef(null);
  const colorRef = useRef(null);

  useEffect(() => {
    // Set the default font size and alignment on mount
    handleFontSizeChange();
    handleAlign(alignment);
  }, [alignment]);

  const handleContentChange = () => {
    const content = editorRef.current.innerHTML;
    setEditableContent(content);
  };

  const handleFontSizeChange = () => {
    const selectedFontSize = fontSizeRef.current.value || fontSize;
    if (document.queryCommandSupported('fontSize')) {
      document.execCommand('fontSize', false, selectedFontSize);
    }
    setFontSize(selectedFontSize);
  };

  const handleColorChange = () => {
    const selectedColor = colorRef.current.value;
    if (document.queryCommandSupported('foreColor')) {
      document.execCommand('foreColor', false, selectedColor);
    }
  };

  const handleConvertToHTML = () => {
    const contentHTML = editorRef.current.innerHTML;
    console.log(contentHTML);
  };

  const handleSetBold = () => {
    document.execCommand('bold', false, null);
  };

  const handleSetItalic = () => {
    document.execCommand('italic', false, null);
  };

  const handleAlign = (alignmentValue) => {
    document.execCommand(`justify${alignmentValue}`, false, null);
    setAlignment(alignmentValue);
  };

  return (
    
    <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', marginTop:'2.5rem'}}>
      
      <div className='formattingTools' style={{ display: 'flex', justifyContent:'center', position: 'sticky', top: 0, background: '#F3F3F3',width:'100%', zIndex: 1000 }}>
        <div style={{ padding: '5px', margin: '2rem' }}>
          <label htmlFor="fontSize" style={{fontSize:'12.8px'}}>Font Size:  </label>
          <select id="fontSize" ref={fontSizeRef} onChange={handleFontSizeChange} value={fontSize}>
            <option value="2">12.8px</option>
            <option value="3">16px</option>
            <option value="5">25px</option>
            <option value="6">31.25px</option>
          </select>
        </div>

        <div style={{ padding: '5px', margin: '2rem' }}>
          <label htmlFor="color" style={{fontSize:'12.8px'}}>Text Color:  </label>
          <select id="color" ref={colorRef} onChange={handleColorChange}>
            <option value="#000000">Black</option>
            <option value="#F22F41">Red</option>
            <option value="#516473">Steel Blue</option>
            <option value="#FFD082">Orange</option>
          </select>
        </div>
        
        <div style={{ padding: '5px', margin: '2rem' }}>
          <button onClick={handleSetBold}>Bold</button>
          <button onClick={handleSetItalic}>Italic</button>
        </div>

        <div style={{ padding: '5px', margin: '2rem' }}>
          <button onClick={() => handleAlign('Left')}>Left Align</button>
          <button onClick={() => handleAlign('Center')}>Center Align</button>
          <button onClick={() => handleAlign('Right')}>Right Align</button>
        </div>

        <div style={{ padding: '5px', margin: '2rem' }}>
          <button onClick={handleConvertToHTML}>Convert to HTML</button>
        </div>

      </div>

      <div style={{border: '1px solid #ccc', margin: '2rem', width:'1000px'}}>
        <div
          contentEditable
          ref={editorRef}
          onInput={handleContentChange}
          style={{ minHeight: '80vh', padding: '2rem', margin: '2rem', outline: 'none'}}
        />
      </div>
    </div>
  );
};