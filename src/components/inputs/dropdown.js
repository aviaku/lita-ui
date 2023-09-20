const DropDown = ({games, game}) => {
    return (
      <select name="game" className="w-full" value={game}>
        {/* <option value="">Select</option> */}
        {games.map((game, i) => (
          <option value={game._id} key={i}>
            {game.name}
          </option>
        ))}
      </select>
    );
}

export default DropDown