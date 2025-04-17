'use client';

import { useState, useEffect } from 'react';
import { title } from '@/components/primitives';
import { MainCard } from '@/components/card';
import { IMemDataDto } from '@/types/MemDataDto';
// import { getSortedMemesData, editMem  } from '@/lib/http';
import { labels } from './constants';
import { staticMemes } from '@/app/columnar_memes/constants';

export default function LinearPage() {
  const [memes, setMemes] = useState<IMemDataDto[]>([]);
  const [like, setLike] = useState<boolean>(false);
  const [curMem, setCurMem] = useState<IMemDataDto | null>(null);

  useEffect(() => {
    (async () => {
      try {
        // const data = await getSortedMemesData();
        // setMemes(data);
        setMemes(staticMemes);
      } catch (err: any) {
        console.log(err);
      }
    })();
  }, []);

  useEffect(() => {
    if (like) {
      (async () => {
        try {
          // await editMem({
          //   _id: curMem?._id || '',
          //   name: curMem?.name || '',
          //   date: curMem?.date || '',
          //   link: curMem?.link || '',
          //   likes: (curMem?.likes || 0) + 1,
          // });
          // const data = await getSortedMemesData();
          // setMemes(data);
          let index: number = memes.findIndex(item => item._id === curMem?._id);
          setMemes(prevMemes => {
            const newMemes = [...prevMemes];
            newMemes[index] = { ...newMemes[index], likes: newMemes[index].likes + 1 };
            return newMemes;
          })
        } catch (err: any) {
          console.log(err);
        } finally {
          setLike(false);
          setCurMem(null);
        }
      })();
    }
  }, [like]);

  return (
    <div className="mb-5">
      <h1 className={title()}>{labels.title}</h1>
      <div className="flex flex-wrap mt-5">
        {memes.map(mem => {
          return (
            <MainCard
              item={mem}
              key={mem?._id}
              setCurMem={setCurMem}
              setLike={setLike}
            />
          );
        })}
      </div>
    </div>
  );
}
