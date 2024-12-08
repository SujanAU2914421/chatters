'use client';

import React, { useEffect, useState } from 'react';
import { getUserIdFromLocalStorage } from '../components/user/handleLocalStorage';

export default function MainHome() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const userIdT = getUserIdFromLocalStorage();

    if (!userIdT) {
      window.location.pathname = '/login';
      // Proceed with user-specific actions
    }
  }, []);
  return (
    <div className="relative h-screen w-screen overflow-hidden font-mono">
      <div className="relative h-full w-full overflow-y-auto overflow-x-hidden bg-gradient-to-r from-gray-50 to-white">
        <div className="relative h-screen w-screen">
          <div className="relative h-full w-full flex pl-32">
            <div className="relative h-full w-1/2">
              <div className="relative h-auto w-full">
                <div className="relative h-auto w-auto pt-32">
                  <div className="relative h-1 w-8 rounded-full bg-black"></div>
                  <div className="relative text-sm font-extralight uppercase pt-3 text-gray-600">
                    us from the start
                  </div>
                  <div className="relative text-6xl font-extrabold uppercase text-gray-600 pt-3">
                    dusk till dawn
                  </div>
                </div>
              </div>
              <div className="relative h-auto w-auto pt-16">
                <div className="relative uppercase font-extrabold">
                  Chatters
                </div>
                <div className="relative text-xs text-gray-600 uppercase font-extralight">
                  website
                </div>
                <div className="relative text-xs text-gray-600 w-full pr-16 pt-6 leading-5">
                  <div className="relative">
                    Where conversations come alive – chat, connect, and create
                    moments in real time!
                  </div>
                  <div className="relative pt-3">
                    Where every message feels like a little piece of warmth,
                    waiting to brighten your day.
                  </div>
                </div>
                <div
                  onClick={() => {
                    window.location.pathname = '/signup';
                  }}
                  className="realtive h-auto w-auto flex pt-4 cursor-pointer"
                >
                  <div className="relative h-8 w-32 rounded bg-gray-700 text-white text-xs flex items-center justify-center">
                    Sign Up Now
                  </div>
                </div>
                <div
                  className="relative pt-8 text-4xl"
                  style={{ fontFamily: 'GreatVibes' }}
                >
                  Chatters
                </div>
              </div>
            </div>
            <div className="relative h-full w-1/2 flex justify-end">
              <div className="relative h-full w-3/4 bg-gray-100">
                <div className="absolute bottom-10 -left-32 h-[24rem] w-[24rem] shadow-xl"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative h-screen w-screen">
          <div className="relative h-full w-full flex items-center">
            <div className="relative h-full w-4/12">
              <div className="absolute bottom-0 right-0 h-[36rem] w-[23rem] border"></div>
              <div className="relative text-7xl font-extrabold flex-col px-20 pt-20 text-gray-600 drop-shadow-xl drop-shadow-black">
                <div>HERE</div>
                <div>WE</div>
                <div>ARE</div>
              </div>
            </div>
            <div className="relative h-full w-6/12 px-20">
              <div className="relative h-full w-full">
                <div className="absolute top-0 left-0 h-[10rem] w-[17rem]"></div>
                <div className="absolute bottom-0 left-0 h-[34rem] w-full bg-gray-50 px-16 pt-16 text-xs leading-6">
                  I am a dreamer, weaving code into colors and light. was a
                  novice, lost in syntax and shadows of doubt. am a builder,
                  crafting worlds from lines of logic. was hesitant, my cursor
                  pausing at each keystroke. am a learner, growing with each
                  challenge meet. was unsure, but now rise, shaping the web with
                  purpose.
                </div>
              </div>
              <div className="absolute bottom-0 left-56 h-[13rem] w-[1px] bg-gray-300"></div>
              <div className="absolute bottom-0 right-0 h-[13rem] w-[23rem] shadow-xl"></div>
            </div>
            <div className="relative h-full w-2/12">
              <div
                className="absolute top-0 right-0 h-[25rem] w-[15rem]"
                style={{
                  background:
                    'url(/images/phil-desforges-d9fskDpKYS4-unsplash.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'end',
                }}
              ></div>
            </div>
          </div>
        </div>
        <div className="relative h-screen w-screen">
          <div className="relative h-full w-full flex pl-32">
            <div className="relative h-full w-1/2">
              <div className="relative h-auto w-full">
                <div className="relative h-auto w-auto pt-32">
                  <div className="relative h-1 w-8 rounded-full bg-black"></div>
                  <div className="relative text-sm font-extralight uppercase pt-3 text-gray-600">
                    My skill my pride
                  </div>
                  <div className="relative text-6xl font-extrabold uppercase text-gray-600 pt-3">
                    About me
                  </div>
                </div>
              </div>
              <div className="absolute z-10 bottom-0 -right-20 h-[20rem] w-[28rem] shadow-xl shadow-gray-200"></div>
            </div>
            <div className="relative h-full w-1/2 flex items-center px-16 bg-gray-100">
              <div className="relative text-xs text-gray-600 w-full leading-6 z-20">
                <div className="relative">
                  Sujan Limbu, or as everyone calls him, Chief, is a charismatic
                  and ambitious soul. He’s preparing for his re-exam, showing
                  his determination and drive to succeed.
                </div>
                <div className="relative pt-3">
                  Is someone who cherishes relationships, values hard work, and
                  always brings a spark of energy wherever he goes.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative h-screen w-screen overflow-hidden">
          <div className="relative h-full w-full">
            <div className="relative h-full w-8/12 px-32">
              <div className="relative h-auto w-full">
                <div className="relative h-auto w-auto pt-32">
                  <div className="relative h-1 w-8 rounded-full bg-black"></div>
                  <div className="relative text-sm font-extralight uppercase pt-3 text-gray-600">
                    us from the start
                  </div>
                  <div className="relative text-6xl font-extrabold uppercase text-gray-600 pt-3">
                    dusk till dawn
                  </div>
                </div>
              </div>
              <div className="relative h-auto w-auto pt-16">
                <div className="relative text-xs text-gray-600 w-full pr-16 pt-6 leading-5">
                  <div className="relative">
                    Sujan Limbu, or as everyone calls him, Chief, is a
                    charismatic and ambitious soul. He’s preparing for his
                    re-exam, showing his determination and drive to succeed.
                  </div>
                  <div className="relative pt-3">
                    Is someone who cherishes relationships, values hard work,
                    and always brings a spark of energy wherever he goes.
                  </div>
                </div>
              </div>
            </div>
            <div
              className="absolute -top-20 right-32 h-[200%] w-[30rem] rotate-[36deg] shadow-xl"
              style={{
                background:
                  'url(/images/phil-desforges-d9fskDpKYS4-unsplash.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute w-4 h-2/6 bg-gray-100 -left-8"></div>
            </div>
          </div>
        </div>
        <div className="relative h-screen w-screen">
          <div className="relative h-full w-full flex">
            <div className="relative h-full w-1/2 flex items-center px-16 bg-gray-100">
              <div className="relative text-xs text-gray-600 w-full leading-6 z-20">
                <div className="relative">
                  Love what you see? Let's make something awesome together!
                </div>
                <div className="relative">
                  Shoot me a message—I'm ready to bring your ideas to life.
                  Let's connect!
                </div>
              </div>
            </div>
            <div className="relative h-full w-1/2 flex items-center px-32">
              <div className="relative h-auto w-full">
                <div className="relative h-auto w-auto text-xs">
                  Want to send a small message?
                </div>
                <div className="relative h-auto w-full pt-8">
                  <div className="relative h-10 w-full border-b">
                    <input
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      type="email"
                      className="outline-none h-full w-full bg-transparent border-none text-xs"
                      placeholder="email"
                    />
                  </div>
                </div>
                <div className="relative h-auto w-full pt-6">
                  <div className="relative h-10 w-full border-b">
                    <input
                      onChange={(e) => {
                        setMessage(e.target.value);
                      }}
                      type="text"
                      className="outline-none h-full w-full bg-transparent border-none text-xs"
                      placeholder="message"
                    />
                  </div>
                </div>
                <div className="relative h-auto w-auto pt-8">
                  <div
                    className={`relative h-10 w-40 text-xs cursor-pointer shadow-md shadow-gray-40 ${
                      message != '' && email != ''
                        ? 'bg-gray-800'
                        : 'bg-gray-600'
                    } text-white flex items-center justify-center`}
                  >
                    Send?
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative h-auto w-full px-16">
          <div className="realtive h-20 w-full border-t flex justify-between items-center text-xs">
            <div className="relative">
              A simple portfolio of developer Sujan
            </div>
            <div className="relative">@portfolio of sujan 2024</div>
          </div>
        </div>
      </div>
    </div>
  );
}
