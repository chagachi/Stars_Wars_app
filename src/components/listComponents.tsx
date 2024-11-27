import styles from "@/app/page.module.css";
import { useFavContext } from "@/context";
import { charsInfos } from "@/types/charsTypes";
import { BsFillStarFill } from "react-icons/bs";

interface listProps {
  list: charsInfos[];
  total: number
}

export default function List(props: listProps) {

  const { fav, setFav } = useFavContext()

  async function handleFav(id: string) {
    const hasID = fav.find((item) => item == id)

    if (!hasID) {
      setFav((prev: string[]) => [...prev, id])
      return
    }

    setFav((prev: string[]) => prev.filter(item => item != id))
  }

  return (
    <div className={styles.list}>
      <div className={styles.itemListTitle}>
        <div>Name</div>
        <div>Height</div>
        <div>Mass</div>
        <div>Hair Color</div>
        <div>Skin Color</div>
      </div>
      {
        props.list && props.list.map((item: charsInfos) => (
          <div key={item.url} className={styles.itemList}>
            <div>{item.name}</div>
            <div>{item.height}</div>
            <div>{item.mass}</div>
            <div>{item.hair_color}</div>
            <div>{item.skin_color}</div>
            <div className={styles.favIcon}
              onClick={() => handleFav(item.url.split('/').reverse()[1])}
            >
              <BsFillStarFill className={fav.find((id) => id == item.url.split('/').reverse()[1]) ? styles.favActive : styles.fav} />
            </div>
          </div>
        ))
      }
      <span>Total: {props.total}</span>
    </div>
  )
}