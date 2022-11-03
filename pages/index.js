import UploadButton from '../components/UploadButton/UploadButton';


export default function Home() {

 
  
  

  return (
    <>
      
      <div className="container">
        <div className="row">
          <div className="column col-12 pt-5 pb-2 ">
            <h1 className="text-center text-capitalize">CSV Parser</h1>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="column col-8 pb-5 pt-2 mx-auto d-flex justify-content-center flex-column ">
            <UploadButton  />
          </div>
        </div>
      </div>
    </>
  )
}
