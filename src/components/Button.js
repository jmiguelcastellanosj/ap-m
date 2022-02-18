function Button({ btnStyle, text, onClick}) {

  return (
    <button
    onClick={onClick}
    // style={{background: color}}
    style={btnStyle} >
      <div className={"textAnim"}>{text}</div>
    </button>
  );
}

Button.defaultProps = {
  btnStyle: {
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
    boxSizing: "border-box",
    margin: "0",
    // padding: 0,
    // textAlign: "center",
    // display: "inline-block",
    width: "100%",
    background: "#000",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    // margin: "5px",
    borderRadius: "5px",
    cursor: "pointer",
    textdecoration: "none",
    fontsize: "1rem",
    fontfamily: "inherit"
  }
  ,
  text: "Submit"
}

export default Button;
