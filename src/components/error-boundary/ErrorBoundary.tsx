import { Button, Empty } from "antd";
import React from "react";

export interface ErrorBoundaryProps {
  children: React.ReactNode;
}
export interface ErrorBoundaryState {
  errorText: string;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public static getDerivedStateFromError(error: any) {
    // 捕获react 组件报错
    // Update state so the next render will show the fallback UI.
    return { errorText: error + "" };
  }

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { errorText: "" };
  }

  public render() {
    const { errorText } = this.state;
    if (errorText !== "") {
      return (
        <div style={{ width: "100%", height: "100%", textAlign: "center" }}>
          <Empty
            description={
              <>
                <div
                  style={{
                    padding: "28px 0",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <span style={{ width: "8px", display: "inline-block" }} />
                  <span
                    style={{
                      width: "144px",
                      height: "22px",
                      fontSize: "16px",
                      color: "#000",
                      lineHeight: "22px",
                    }}
                  >
                    很抱歉，出现异常！
                  </span>
                </div>
                <Button
                  onClick={() => {
                    window.parent.location.reload();
                  }}
                  type="primary"
                  shape="round"
                  className="f-c"
                  style={{ display: "inline-flex" }}
                  icon={
                    <svg viewBox="0 0 24 24" width="16px" height="16px">
                      <path
                        fill="#fff"
                        d="M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z"
                      />
                    </svg>
                  }
                >
                  刷新重试
                </Button>
              </>
            }
          />
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
