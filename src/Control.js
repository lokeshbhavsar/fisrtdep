import React, { useRef } from "react";
import { TransformWrapper, TransformComponent,  } from "react-zoom-pan-pinch";

const Component = ()=> {
const transformComponentRef = useRef()

const zoomToImage = ()=>{
  const { zoomToElement } = transformComponentRef.current
  zoomToElement('imgExample')
}

const Control = ({zoomIn, zoomOut, resetTransform})=>(
  <>
    <button onClick={() => zoomIn()}>+</button>
    ||
    <button onClick={() => zoomOut()}>-</button>
    ||
    <button onClick={() => resetTransform()}>x</button>
  </>
)

    return (
        <div>
  <TransformWrapper
        initialScale={1}
        initialPositionX={200}
        initialPositionY={100}
        ref={transformComponentRef}
      >
        {(utils) => (
          <>
            <Control {...utils}/>
            <TransformComponent>
              <img src="one.jpg" alt="test" id="imgExample" />
              <div onClick={zoomToImage}>Example text</div>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>

        </div>
    
    );
}
export default Component