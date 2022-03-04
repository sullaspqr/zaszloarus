import React, { useState, useEffect } from 'react' 
import { NavLink } from 'react-router-dom';

export function FlagListPage()
{
    const[flags, setFlags] = useState([]);
    const[isFetchPending, setFetchPending] = useState(false);

    useEffect(() => {
        setFetchPending(true);
        fetch("https://localhost:5001/api/product")
            .then((res) => res.json())
            .then((zaszlok) => setFlags(zaszlok))
            .catch(console.log)
            .finally(() => {
                setFetchPending(false);
            });
    }, []);

    return(
        <div className="p5 m-auto text-center content bg-ivory">
            {isFetchPending ? (
              <div className="spinner-border"></div>
            ) : (
                <div>
                    <h2>Zászlók:</h2>
                    {flags.map((flag) => (
                        <NavLink key={flag.Id} to={"/zaszlo/" + flag.Id}>
                        <div className="card col-sm-3 d-inline-block m-1 p-2">
                         <p className="text-dark">{flag.Name}</p>
                         <div>{flag.Price} ft -</div>
                         <div className="small">Készleten: {flag.Qty} db</div>
                         <div className="card-body">
                             <img alt={flag.Name}
                                className="img-fluid"
                                style={{maxHeight: 200}}
                                src={flag.Flagimg ? flag.Flagimg : "https://via.placeholder.com/400x800"}
                                />
                         </div>
                        </div>
                        </NavLink>
                    ))}
                </div>
            )}
        </div>
    );
}
export default FlagListPage;