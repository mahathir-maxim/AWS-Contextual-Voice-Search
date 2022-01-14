import React, { useEffect, useState } from "react";
import OutputTable from '../Table/table.js';
import { CompanyList } from "../radio_buttons/CompanyList.js";
import { AttributeList } from "../radio_buttons/AttributeList.js";
import { YearList } from "../radio_buttons/YearList.js";


function GetSearch() {
    const [visible, setVisible] = useState(false);
        return (         
            <div>
                <button onClick={() => setVisible(!visible)}>
                {visible ? 'Submit GET Search' : 'Submit GET Search'}
                </button>
                {visible && <OutputTable /> }
            </div>
        );
    }

export { GetSearch }; 