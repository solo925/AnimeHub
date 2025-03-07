import { Html, useProgress } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const CanvasLoader = () => {
  const { progress } = useProgress();

  return (
    <Html
      as="div"
      center
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <span className="canvas-loader"></span>
      <p
        style={{
          fontSize: 14,
          color: "#F1F1F1",
          fontWeight: 800,
          marginTop: 40,
        }}
      >
        {progress.toFixed(2)}%
      </p>
    </Html>
  );
};

// ✅ Wrapper component to ensure CanvasLoader is inside <Canvas>
const MyScene = () => {
  return (
    <Canvas>
      {/* The loader must be inside Canvas to work properly */}
      <CanvasLoader />
      {/* Other 3D components go here */}
    </Canvas>
  );
};

// ✅ Alternative loader for non-3D components
export const UILoader = () => {
  return (
    <div style={{ textAlign: "center", color: "#F1F1F1", fontSize: 14 }}>
      <span className="canvas-loader"></span>
      <p>Loading...</p>
    </div>
  );
};

export default MyScene;
