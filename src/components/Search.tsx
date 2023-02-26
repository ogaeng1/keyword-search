import React, { useState } from "react";
import Map from "./Map";
import "../styles/search.scss";

export interface searchProps {
    search: string
}

const Search = () => {
    const [value, setValue] = useState("");
    const [keyWord, setKeyWord] = useState("");

    const onChangeKeyWord = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

    const onSubmitKeyWord = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setKeyWord(value);
    }
    return (
        <div className="search-map">
            <form onSubmit={onSubmitKeyWord}>
                <input type="text" placeholder="검색할 키워드를 입력해 주세요(예: 데이트 코스)" onChange={onChangeKeyWord} />
                {value === "" ? <button type="submit" disabled>🔍</button> : <button type="submit" className="able">🔍</button> }
            </form>
            <Map search={keyWord} /> 
        </div>
    );
}

export default Search;