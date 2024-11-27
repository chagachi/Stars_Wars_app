'use client'

import styles from "../page.module.css";
import { useCallback, useEffect, useState } from "react";
import { charsInfos, searchTypes, } from "@/types/charsTypes";
import { loadFavChars } from "@/controllers/controllers";
import Image from "next/image";
import { BsSearch } from "react-icons/bs";
import { useFavContext } from "@/context";
import Link from "next/link";
import List from '@/components/listComponents'
import { RingLoader } from "react-spinners";

export default function Home() {
  const [chars, setChars] = useState<charsInfos[]>([])
  const [filtered, setFiltered] = useState<charsInfos[]>([])
  const [search] = useState<searchTypes>({
    name: '',
    hair: '',
    skin: ''
  })
  const [loader, setLoader] = useState(true)
  const { fav } = useFavContext()

  const favList = useCallback(async () => {
    const data: charsInfos[] = []

    if (chars.length > fav.length) {
      for (let i = 0; i < chars.length; i++) {
        if (fav.find((a) => a == chars[i].url.split('/').reverse()[1])) {
          data.push(chars[i])
        }
      }
      setChars(data)
    }
    else {
      for (let index = 0; index < fav.length; index++) {
        const element = await loadFavChars(fav[index])
        data.push(element)
      }

      setChars(data)
      setLoader(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fav])

  useEffect(() => {
    favList()
  }, [favList, fav])

  function filter(e: string, a: string) {
    if (a == 'name') {
      search.name = e

      const newList = chars.filter((el) => {
        return el.name.toLowerCase().indexOf(e.toLowerCase()) >= 0
      })
      setFiltered(newList)
    }

    if (a == 'hair') {
      search.hair = e

      const newList = chars.filter((el) => {
        return el.hair_color.toLowerCase().indexOf(e.toLowerCase()) >= 0
      })
      setFiltered(newList)
    }

    if (a == 'skin') {
      search.skin = e

      const newList = chars.filter((el) => {
        return el.skin_color.toLowerCase().indexOf(e.toLowerCase()) >= 0
      })
      setFiltered(newList)
    }
  }

  return (
    <div className={styles.page}>
      <Image
        src='/Star_Wars_Logo.png'
        width={500}
        height={250}
        alt="Star Wars Logo"
      />

      <div className={styles.actionDiv}>
        <div className={styles.searchDiv}>
          <input type="text" value={search.name} onChange={(e) => filter(e.target.value, 'name')} placeholder="Search by Name" />
          <button><BsSearch className={styles.searchIcon} size='1.3em' /></button>
        </div>
        <div className={styles.searchDiv}>
          <input type="text" value={search.hair} onChange={(e) => filter(e.target.value, 'hair')} placeholder="Search by hair color" />
          <button><BsSearch className={styles.searchIcon} size='1.3em' /></button>
        </div>
        <div className={styles.searchDiv}>
          <input type="text" value={search.skin} onChange={(e) => filter(e.target.value, 'skin')} placeholder="Search by skin color" />
          <button><BsSearch className={styles.searchIcon} size='1.3em' /></button>
        </div>

        <div className={styles.favDiv}>
          <Link href='/'>
            <button className={styles.favButton}>
              Home
            </button>
          </Link>
        </div>
      </div>

      {
        chars && loader == false && <List list={filtered.length > 0 ? filtered : chars} total={filtered.length > 0 ? filtered.length : chars.length} />
      }

      {
        loader && <RingLoader color="#FFE81F" loading={loader} />
      }
    </div>
  );
}
