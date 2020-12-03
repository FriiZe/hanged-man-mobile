interface Player {
  displayName: string;
  id: string;
}

type RoomsRoutes = {
  Rooms: undefined;
  Lobby: { roomId: string, trials?: number };
  Game: { players: Player[], gameId: string }
};

export default RoomsRoutes;
