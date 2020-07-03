import React from "react";

const App = (props) => {
    return (
        <div className="app">
            <div className="welcome">Hello React!</div>
            <div className="footer">
                Code by
                <a href="https://www.github.com/onejeet" title="Github Page">
                    {" "}
                    Jitendra Sharma
                </a>
            </div>
        </div>
    );
};

export default App;
