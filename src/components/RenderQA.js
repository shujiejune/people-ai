import React from "react";
import { Spin } from "antd";

const containerStyle = {
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
  marginBottom: "20px",
};

const userContainer = {
  textAlign: "right",
};

const agentContainer = {
  textAlign: "left",
};

const userStyle = {
  maxWidth: "50%",
  textAlign: "left",
  backgroundColor: "#1677ff",
  color: "white",
  display: "inline-block",
  borderRadius: "10px",
  padding: "10px",
  marginBottom: "10px",
};

const agentStyle = {
  maxWidth: "50%",
  textAlign: "left",
  backgroundColor: "#f9f9fe",
  color: "black",
  display: "inline-block",
  borderRadius: "10px",
  padding: "10px",
  marginBottom: "10px",
};

const RenderQA = (props) => {
  const { conversation } = props;

  return (
    <>
      {conversation?.map((each, index) => (
        <div key={index} style={containerStyle}>
          <div style={userContainer}>
            <div style={userStyle}>{each.question}</div>
          </div>
          <div style={agentContainer}>
            <div style={agentStyle}>
              {each.answer === null ? <Spin size="small" /> : each.answer}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default RenderQA;
