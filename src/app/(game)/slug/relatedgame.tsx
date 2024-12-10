const getRelatedGames = (categories: string[]) => {
    // Simulated data
    return [
      { id: "1", title: "Puzzle Game 1", thumbnail: "/placeholder.svg", slug: "puzzle-game-1" },
      { id: "2", title: "Puzzle Game 2", thumbnail: "/placeholder.svg", slug: "puzzle-game-2" },
      { id: "3", title: "Puzzle Game 3", thumbnail: "/placeholder.svg", slug: "puzzle-game-3" },
      { id: "4", title: "Puzzle Game 4", thumbnail: "/placeholder.svg", slug: "puzzle-game-4" },
      { id: "5", title: "Puzzle Game 5", thumbnail: "/placeholder.svg", slug: "puzzle-game-5" },
      { id: "6", title: "Puzzle Game 6", thumbnail: "/placeholder.svg", slug: "puzzle-game-6" }
    ]
  }

export const RelatedGames = ({ categories }: { categories: string[] }) => {
    const relatedGames = getRelatedGames(categories);

    return (
      <div className="p-6">
        <h2>Related Games</h2>
        {relatedGames.map((game) => (
          <div key={game.id} className="w-[200px] h-[200px] bg-white mt-4">
            <h3>{game.title}</h3>
            <img src={game.thumbnail} alt={game.title} />
          </div>
        ))}
      </div>
    );
  };
  
  