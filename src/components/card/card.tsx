import "./card.css";
const Card = ({ pokemon }: any) => {
  return (
    <>
      {pokemon.map((item: any) => {
        return (
          <div className="card-pokemon ">
            <img
              className="rounded-circle "
              src={item.sprites.front_default}
              alt=""
            />
            <h2>{item.name}</h2>
          </div>
        );
      })}
    </>
  );
};
export default Card;
