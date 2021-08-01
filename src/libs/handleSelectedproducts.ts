const arrayID: string[] = [];
const handleChange = (e) => {
  if (e.target.checked) {
    arrayID.push(e.target.value);
  } else {
    for (let i = 0; i < arrayID.length; i += 1) {
      if (arrayID[i] === e.target.value) {
        arrayID.splice(i, 1);
      }
    }
  }
  console.log(arrayID);
};
export default handleChange;
