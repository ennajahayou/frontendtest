const ParametersRow = ({ label, parameter, setParameter }) => {
  const changeParameter = (event, index) => {
    let newParameter = parameter;
    newParameter[index] = Number(event.target.value);
    setParameter(newParameter);
  };

  return (
    <tr>
      <td class="tg-nrix">{label}</td>
      <td class="tg-nrix">
        <input
          type="number"
          min="0"
          placeholder={parameter[0]}
          onChange={(event) => changeParameter(event, 0)}
        />
      </td>
      <td class="tg-nrix">
        <input
          type="number"
          min="0"
          placeholder={parameter[1]}
          onChange={(event) => changeParameter(event, 1)}
        />
      </td>
      <td class="tg-nrix">
        <input
          type="number"
          min="0"
          placeholder={parameter[2]}
          onChange={(event) => changeParameter(event, 2)}
        />
      </td>
      <td class="tg-nrix">
        <input
          type="number"
          min="0"
          placeholder={parameter[3]}
          onChange={(event) => changeParameter(event, 3)}
        />
      </td>
    </tr>
  );
};

export default ParametersRow;
