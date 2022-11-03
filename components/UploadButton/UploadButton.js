import styles from './UploadButton.module.scss';
import {useState, useRef} from 'react';
import Papa from 'papaparse';
import {zipsToArray, oneCityPerZip} from '../../lib/parse';

const UploadButton = () => {
  const originalButtonText = "Copy to Clipboard";
  const fileInput = useRef(null);
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState(originalButtonText);

  const parseFile =   (file) => {
    let fileName = file.name;
    let newData = [];
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        let data = results.data;
        if(fileName === 'city-state-data-simplemaps.com.csv'){
         let parsedData = zipsToArray(data);
          newData =  oneCityPerZip(parsedData);
      }
        setData(newData)
        setLoading(false)
        //clear file input
        fileInput.current.value = '';

      }
    });
  }

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  }

  const handleClick =  () => {
    if(file) {
      setLoading(true);
      parseFile(file);
      
    }
    if(!file) {
      alert('Please select a file');
    }
  }

  const handleReset = () => {
    setData(null);
    setButtonText(originalButtonText);
    setFile(null);
  }

  const handleInputClick = () => {
    setData(null);
    setLoading(false);
    setButtonText(originalButtonText);
  }

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setButtonText('Copied!');
    setTimeout(() => {
      setButtonText(originalButtonText);
    }, 2000);
  }

  return (
    <>
    <div className={`${styles.resetButton} py-3`}>
    {data && <button className="btn " onClick={handleReset}>Reset</button>}
    
    </div>
    <label className={styles.uploadButtonLabel}>
      <div className="input-group">
        <input onClick={handleInputClick} ref={fileInput} type="file" className="form-control" accept=".csv" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload" onChange={handleFile}/>
        <button onClick={handleClick} className="btn " type="button" id="inputGroupFileAddon04">Parse</button>
      </div>  
    </label>
    <div>
    {loading && <h3 className={`${styles.loading} pt-2`}>Loading...</h3>}
    {data && 
    <>
    <div className={styles.pre__header}>
    <h2>CSV JSON (scrollable):</h2>
    </div>
    <div className="py-2">
    <button className="btn " onClick={handleCopyToClipboard}>{buttonText}</button>
    </div>
    
    <div className={styles.pre} >
    
    <pre >{JSON.stringify(data, null, 2)}</pre>
    </div>
    </>
    }
    </div>
   
    </>
  );
}

export default UploadButton;