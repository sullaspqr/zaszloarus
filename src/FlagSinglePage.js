import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

export function FlagSinglePage(props)
{
    const params = useParams();
    const id = params.flagId;
    const [flag, setFlag] = useState([]);
    const [isPending, setPending] = useState(false);

    useEffect(() => {
        setPending(true);
        (async () => {
            try {
                const res = await fetch(`https://kodbazis.hu/api/instruments/${id}`, { credentials: "include" })
                const flag = await res.json();
                setFlag(flag);
            }
            catch(e)
            {
                console.log(e);
            }
            finally
            {
                setPending(false);
            }

        })
    ();

}, [id]);

    return(
        <div className="p5 m-auto text-center content bg-lavender">
            {isPending || !flag.id ? (
              <div className="spinner-border"></div>
            ) : (
                <div className="card p-3">
                    <div className="card-body">
                        <h4>{flag.brand}</h4>
                        <h5 className="card-title">{flag.name}</h5>
                        <div className="lead">{flag.price}ft</div>
                        <p>Készleten? {flag.quantity} db</p>
                        <img alt={flag.name}
                            className="img-fluid rounded"
                            style={{ maxHeight: "500px" }}
                            src={flag.imageURL ? flag.imageURL : "https://via.placeholder.com/400x800"}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
export default FlagSinglePage;