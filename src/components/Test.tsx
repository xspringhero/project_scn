import data from "../data/categories.json"

const Test = () => {
    const names = ["ReactJS", "Javascript", "HTML/CSS"];
    console.log(data);

    return(
        <>
            <ul>
                {names.map((item)=> (<li key={item}>{item}</li>))}
            </ul>
        </>
    )
}

export default Test;