import "./dimsumItem.css";

export default function dimsumItem(item) {
    return (
        <div className="dimsumitem">
            {<img src={item.image} />}
            <div className="info">
                <h3>{item.name}</h3>
                <h3>${item.price}</h3>
            </div>
            <div className="category">
                <div class="m">{item.method}</div>
                <div class="t">{item.taste}</div>
            </div>
        </div>
    )
}