export default function dimsumItem(item) {
    return (
        <div>
            {<img style={{width:"100%"}} src={item.image} />}
            <h3>{item.name}</h3>
            <h4>Price: {item.price}</h4>
        </div>
    )
}