import React from "react";
import { BsFillPatchMinusFill, BsFillPatchPlusFill } from "react-icons/bs";
import styles from "./styles.module.scss";

interface Question {
  question: string;
  answer: string;
}

interface QuestionsProps {
  questions: Question[];
  product: {
    questions: Question[];
  };
  setProduct: React.Dispatch<
    React.SetStateAction<{
      questions: Question[];
    }>
  >;
}

const Questions: React.FC<QuestionsProps> = ({
  questions,
  product,
  setProduct,
}) => {
  const handleQuestion = (
    i: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const values = [...questions];
    values[i][e.target.name] = e.target.value;
    setProduct({ ...product, questions: values });
  };

  const handleRemove = (i: number) => {
    if (questions.length > 0) {
      const values = [...questions];
      values.splice(i, 1);
      setProduct({ ...product, questions: values });
    }
  };

  return (
    <div>
      <div className={styles.header}>Questions</div>
      {questions.length === 0 && (
        <BsFillPatchPlusFill
          className={styles.svg}
          onClick={() => {
            setProduct({
              ...product,
              questions: [
                ...questions,
                {
                  question: "",
                  answer: "",
                },
              ],
            });
          }}
        />
      )}
      {questions.map((q, i) => (
        <div className={styles.clicktoadd} key={i}>
          <input
            type="text"
            name="question"
            placeholder="Question"
            value={q.question}
            onChange={(e) => handleQuestion(i, e)}
          />
          <input
            type="text"
            name="answer"
            placeholder="Answer"
            value={q.answer}
            onChange={(e) => handleQuestion(i, e)}
          />
          <BsFillPatchMinusFill onClick={() => handleRemove(i)} />
          <BsFillPatchPlusFill
            onClick={() => {
              setProduct({
                ...product,
                questions: [
                  ...questions,
                  {
                    question: "",
                    answer: "",
                  },
                ],
              });
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default Questions;
