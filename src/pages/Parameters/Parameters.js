import { useState, useEffect } from "react";
import axios from "axios";
import "./Parameter.css";

import ParameterRow from "./ParameterRow";

const Parameters = () => {
  const [autoEvaluationDifficulty, setAutoEvaluationDifficulty] = useState([
    0, 0, 0, 0,
  ]);
  const [autoEvaluationReactivity, setAutoEvaluationReactivity] = useState([
    0, 0, 0, 0,
  ]);
  const [peerReviewResult, setPeerReviewResult] = useState([0, 0, 0, 0]);
  const [peerReviewReactivity, setPeerReviewReactivity] = useState([
    0, 0, 0, 0,
  ]);
  const [ceoReviewResult, setCeoReviewResult] = useState([0, 0, 0, 0]);
  const [ceoReviewReactivity, setCeoReviewReactivity] = useState([0, 0, 0, 0]);

  const [weightAutoEvaluation, setWeightAutoEvaluation] = useState(0);
  const [weightPeerReview, setWeightPeerReview] = useState(0);
  const [weightCeoReview, setWeightCeoReview] = useState(0);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/parameters/get-parameters")
      .then((res) => {
        setAutoEvaluationDifficulty(res.data.autoEvaluation.difficulty);
        setAutoEvaluationReactivity(res.data.autoEvaluation.reactivity);
        setPeerReviewResult(res.data.peerReview.result);
        setPeerReviewReactivity(res.data.peerReview.reactivity);
        setCeoReviewResult(res.data.CEOReview.result);
        setCeoReviewReactivity(res.data.CEOReview.reactivity);

        setWeightAutoEvaluation(100 * res.data.scoreWeight.autoEvaluation);
        setWeightPeerReview(100 * res.data.scoreWeight.peerReview);
        setWeightCeoReview(100 * res.data.scoreWeight.CEOReview);
      });
  }, []);

  const handleSubmit = () => {
    const jsonData = {
      autoEvaluation: {
        difficulty: autoEvaluationDifficulty,
        reactivity: autoEvaluationReactivity,
      },
      peerReview: {
        result: peerReviewResult,
        reactivity: peerReviewReactivity,
      },
      CEOReview: {
        result: ceoReviewResult,
        reactivity: ceoReviewReactivity,
      },
      scoreWeight: {
        autoEvaluation: weightAutoEvaluation / 100,
        peerReview: weightPeerReview / 100,
        CEOReview: weightCeoReview / 100,
      },
    };

    console.log(jsonData);
    console.log({ weightAutoEvaluation, weightPeerReview, weightCeoReview });
    console.log(
      "SUM : ",
      weightAutoEvaluation + weightPeerReview + weightCeoReview
    );
    if (weightAutoEvaluation + weightPeerReview + weightCeoReview !== 100) {
      alert("The sum of the weights must be equal to 100");
      return;
    }
    // const jsonData = {
    //   autoEvaluation: {
    //     difficulty: autoEvaluationDifficulty,
    //     reactivity: autoEvaluationReactivity,
    //   },
    //   peerReview: {
    //     result: peerReviewResult,
    //     reactivity: peerReviewReactivity,
    //   },
    //   CEOReview: {
    //     result: ceoReviewResult,
    //     reactivity: ceoReviewReactivity,
    //   },
    //   scoreWeight: {
    //     autoEvaluation: weightAutoEvaluation / 100,
    //     peerReview: weightPeerReview / 100,
    //     CEOReview: weightCeoReview / 100,
    //   },
    // };

    axios.post(
      process.env.REACT_APP_BACKEND_URL + "/parameters/save-parameters",
      { parameters: jsonData }
    );
  };

  const handleReset = () => {
    const jsonData = {
      autoEvaluation: {
        difficulty: [1, 4, 10, 20],
        reactivity: [1, 4, 10, 20],
      },
      peerReview: {
        result: [1, 4, 10, 20],
        reactivity: [1, 4, 10, 20],
      },
      CEOReview: {
        result: [1, 4, 10, 20],
        reactivity: [1, 4, 10, 20],
      },
      scoreWeight: {
        autoEvaluation: 0.34,
        peerReview: 0.33,
        CEOReview: 0.33,
      },
    };

    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/parameters/save-parameters", {
        parameters: jsonData,
      })
      .then(() => {
        window.location.reload(false);
      });
  };

  return (
    <>
      <div>
        <table class="tg">
          <thead>
            <tr>
              <th class="tg-0lax"></th>

              <th class="tg-0lax">Level 1</th>
              <th class="tg-0lax">Level 2</th>
              <th class="tg-0lax">Level 3</th>
              <th class="tg-0lax">Level 4</th>
            </tr>
          </thead>
          <tbody>
            <ParameterRow
              label={"Auto-evaluation difficulty"}
              parameter={autoEvaluationDifficulty}
              setParameter={setAutoEvaluationDifficulty}
            />
            <ParameterRow
              label={"Auto-evaluation reactivity"}
              parameter={autoEvaluationReactivity}
              setParameter={setAutoEvaluationReactivity}
            />
            <ParameterRow
              label={"Peer-review result"}
              parameter={peerReviewResult}
              setParameter={setPeerReviewResult}
            />
            <ParameterRow
              label={"Peer-review reactivity"}
              parameter={peerReviewReactivity}
              setParameter={setPeerReviewReactivity}
            />
            <ParameterRow
              label={"CEO-review result"}
              parameter={ceoReviewResult}
              setParameter={setCeoReviewResult}
            />
            <ParameterRow
              label={"CEO-review reactivity"}
              parameter={ceoReviewReactivity}
              setParameter={setCeoReviewReactivity}
            />
          </tbody>
        </table>
      </div>

      <div>
        <table class="">
          <thead>
            <tr>
              <th class="tg-0lax"></th>

              <th class="tg-0lax">Auto-evaluation</th>
              <th class="tg-0lax">Peer-review</th>
              <th class="tg-0lax">CEO-review</th>
            </tr>
          </thead>
          <tr>
            <td class="tg-0lax">Weight</td>
            <td class="tg-0lax">
              <input
                type="number"
                min="0"
                value={weightAutoEvaluation}
                onChange={(event) =>
                  setWeightAutoEvaluation(Number(event.target.value))
                }
              />
            </td>
            <td class="tg-0lax">
              <input
                type="number"
                min="0"
                value={weightPeerReview}
                onChange={(event) =>
                  setWeightPeerReview(Number(event.target.value))
                }
              />
            </td>
            <td class="tg-0lax">
              <input
                type="number"
                min="0"
                value={weightCeoReview}
                onChange={(event) =>
                  setWeightCeoReview(Number(event.target.value))
                }
              />
            </td>
          </tr>
        </table>
      </div>

      <button className="submission-button" onClick={handleSubmit}>
        SUBMIT
      </button>
      <button className="submission-button" onClick={handleReset}>
        RESET
      </button>
    </>
  );
};

export default Parameters;
