import { useState } from "react";
import styles from "./JavascriptCalculator.module.css";

export default function JavascriptCalculator() {
    const [answer, setAnswer] = useState("");
    const [expression, setExpression] = useState("0");
    const et = expression.trim();

    const isOperator = (symbol) => {
        return /[*/+-]/.test(symbol);
    }

    const buttonPress = (symbol) => {
        if (symbol === "clear") {
            setAnswer("");
            setExpression("0");
        } else if (isOperator(symbol)) {
            setExpression(et + " " + symbol + " ");
        } else if (symbol === "=") {
            calculate();
        } else if (symbol === "0") {
            if (expression.charAt(0) !== "0") {
                setExpression(expression + symbol);
            }
        } else if (symbol === ".") {
            const lastNumber = expression.split(/[-+/*]/g).pop();
            if (!lastNumber) return;
            if (lastNumber?.includes(".")) return;
            setExpression(expression + symbol);
        } else {
            if (expression.charAt(0) === "0") {
                setExpression(expression.slice(1) + symbol);
            } else {
                setExpression(expression + symbol);
            }
        }
    }

    const calculate = () => {
        if (isOperator(et.charAt(et.length- 1))) return;
        const parts = et.split(" ");
        const newParts = [];

        for (let i = parts.length - 1; i >= 0; i--) {
            if (["*", "/", "+"].includes(parts[i]) && isOperator(parts[i - 1])) {
                newParts.unshift(parts[i]);
                let j = 0;
                let k = i - 1;
                while (isOperator(parts[k])) {
                    k--;
                    j++;
                }
                i -= j;
            } else {
                newParts.unshift(parts[i]);
            }
        }
        const newExpression = newParts.join(" ");
        if (isOperator(newExpression.charAt(0))) {
            setAnswer(eval(answer + newExpression))
        } else {
            setAnswer(eval(newExpression));
        }
        setExpression("");
    }

    return (
        <div className={styles.calculator}>
            <div className={styles.outputScreen} id="display">
                <div id="answer">{answer}</div>
                <div id="expression">{expression}</div>
            </div>
            <div className={styles.buttonContainer}>
                <div className={styles.clearBtn} onClick={() => buttonPress("clear")} id="clear">AC</div>
                <div className={styles.divideBtn} onClick={() => buttonPress("/")} id="divide">/</div>
                <div className={styles.multiplyBtn} onClick={() => buttonPress("*")} id="multiply">X</div>

                <div className={styles.sevenBtn} onClick={() => buttonPress("7")} id="seven">7</div>
                <div className={styles.eightBtn} onClick={() => buttonPress("8")} id="eight">8</div>
                <div className={styles.nineBtn} onClick={() => buttonPress("9")} id="nine">9</div>
                <div className={styles.subtractBtn} onClick={() => buttonPress("-")} id="subtract">-</div>

                <div className={styles.fourBtn} onClick={() => buttonPress("4")} id="four">4</div>
                <div className={styles.fiveBtn} onClick={() => buttonPress("5")} id="five">5</div>
                <div className={styles.sixBtn} onClick={() => buttonPress("6")} id="six">6</div>
                <div className={styles.addBtn} onClick={() => buttonPress("+")} id="add">+</div>

                <div className={styles.oneBtn} onClick={() => buttonPress("1")} id="one">1</div>
                <div className={styles.twoBtn} onClick={() => buttonPress("2")} id="two">2</div>
                <div className={styles.threeBtn} onClick={() => buttonPress("3")} id="three">3</div>

                <div className={styles.zeroBtn} onClick={() => buttonPress("0")} id="zero">0</div>
                <div className={styles.decimalBtn} onClick={() => buttonPress(".")} id="decimal">.</div>
                <div className={styles.equalsBtn} onClick={() => buttonPress("=")} id="equals">=</div>

            </div>
        </div>
    )
}

