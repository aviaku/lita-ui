import { useMediaQuery } from "react-responsive";

export default function SelectInput({
  game,
  games,
  handleRegisterChange,
  dateError,
}) {
  const view1 = useMediaQuery({
    query: "(min-width: 539px)",
  });
  const view2 = useMediaQuery({
    query: "(min-width: 850px)",
  });
  const view3 = useMediaQuery({
    query: "(min-width: 1170px)",
  });
  return (
    <div
      className="w-full"
      style={{ marginBottom: `${dateError && !view3 ? "90px" : "0"}` }}
    >
      <select name="game" className="w-full" value={game} onChange={handleRegisterChange}>
        <option value="">Select</option>
        {games.map((game, i) => (
          <option value={game._id} key={i}>
            {game.name}
          </option>
        ))}
      </select>
      {dateError && (
        <div
          className={
            !view3 ? "input_error" : "input_error input_error_select_large"
          }
        >
          <div
            className={!view3 ? "error_arrow_bottom" : "error_arrow_left"}
          ></div>
          {dateError}
        </div>
      )}
    </div>
  );
}
