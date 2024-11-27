'use client'

import styles from "./page.module.css";
import { useCallback, useEffect, useState } from "react";
import { charsResponse, charsResponseModel } from "@/types/charsTypes";
import { listChars, pageNavigation } from "@/controllers/controllers";
import Image from "next/image";
import { BsSearch } from "react-icons/bs";
import Link from "next/link";
import List from '@/components/listComponents'
import { RingLoader } from "react-spinners";

export default function Home() {
  const [chars, setChars] = useState<charsResponse>(charsResponseModel)
  const [search, setSearch] = useState('')
  const [loader, setLoader] = useState(true)

  const firstCharList = useCallback(async () => {
    const data = await listChars()

    setChars(data)
    setLoader(false)
  }, [])

  useEffect(() => {
    firstCharList()
  }, [firstCharList])

  async function nextPage() {
    const data = await pageNavigation(chars.next)

    setChars(data)
  }

  async function previousPage() {
    if (chars.previous == null) {
      return
    }
    const data = await pageNavigation(chars.previous)

    setChars(data)
  }

  async function searchChar() {
    const data = await listChars(search)

    setChars(data)
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
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by Name" />
          <button onClick={searchChar}><BsSearch className={styles.searchIcon} size='1.3em' /></button>
        </div>

        <div className={styles.favDiv}>
          <Link href='/favorites'>
            <button className={styles.favButton}>
              Favorites
            </button>
          </Link>
        </div>
      </div>

      {
        chars.results && loader == false && <List list={chars.results} total={chars.count} />
      }

      {
        loader && <RingLoader color="#FFE81F" loading={loader} />
      }

      <div className={styles.buttons}>
        {
          chars.previous && loader == false && <button onClick={previousPage}>Previous</button>
        }
        {
          chars.next && loader == false && <button onClick={nextPage}>Next</button>
        }
      </div>

    </div>
  );
}
