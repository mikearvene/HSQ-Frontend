import { useState, useRef, useEffect } from 'react';
import { Container } from 'react-bootstrap';

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
    handleColorChange();

    handleAlign(alignment);


  }, [alignment,fontSizeRef, colorRef, fontSize, editorRef]);

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
  
  const handleConvertToHTML = () => {
    const contentHTML = editorRef.current.innerHTML;
    console.log(contentHTML);
  };

  const fontstyle = {
    fontSize:'12.8px'
  }
  return (
    <Container>
    <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', marginTop:'2.5rem'}}>
      
      <div className='formattingTools' style={{ display: 'flex', justifyContent:'center', position: 'sticky', top: 40, background: '#F3F3F3',width:'100%', zIndex: 1000, borderRadius:"8px"}}>
        <div style={{ padding: '5px', margin: '2rem' }}>
          <label htmlFor="fontSize" style={fontstyle}>Font Size:  </label>
          <select style={fontstyle} id="fontSize" ref={fontSizeRef} onChange={handleFontSizeChange} value={fontSize}>
            <option style={fontstyle} value="2">10.24px</option>
            <option style={fontstyle} value="3">16px</option>
            <option style={fontstyle} value="6">31.25px</option>
          </select>
        </div>

        <div style={{ padding: '5px', margin: '2rem' }}>
          <label htmlFor="color" style={fontstyle}>Text Color:  </label>
          <select style={fontstyle} id="color" ref={colorRef} onChange={handleColorChange}>
            <option style={fontstyle} value="#000000">Black</option>
            <option style={fontstyle} value="#F22F41">Red</option>
            <option style={fontstyle} value="#516473">Steel Blue</option>
            <option style={fontstyle} value="#FFD082">Orange</option>
          </select>
        </div>
        
        <div style={{ padding: '5px', margin: '2rem' }}>
          <button style={fontstyle} onClick={handleSetBold}>Bold</button>
          <button style={fontstyle} onClick={handleSetItalic}>Italic</button>
        </div>

        <div style={{ padding: '5px', margin: '2rem' }}>
          <button style={fontstyle} onClick={() => handleAlign('Left')}>Left Align</button>
          <button style={fontstyle} onClick={() => handleAlign('Center')}>Center Align</button>
          <button style={fontstyle} onClick={() => handleAlign('Right')}>Right Align</button>
        </div>

        <div style={{ padding: '5px', margin: '2rem' }}>
          <button style={fontstyle} onClick={handleConvertToHTML}>Convert to HTML</button>
        </div>

      </div>

      <div className='mt-4 container-fluid' style={{border: '1px solid #ccc', margin: '2rem', width:'75vw'}}>
        <div
          contentEditable
          ref={editorRef}
          onInput={handleContentChange}
          style={{ minHeight: '800px', padding: '2rem', margin: '2rem', outline: 'none'}}
        />
      </div>
      
    </div>
    </Container>
  );
};