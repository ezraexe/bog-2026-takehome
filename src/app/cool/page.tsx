export default function Kewl() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-primary text-white gap-5">
      {/* 
      Write something unique about you here! 
      It could be a club you're part of, a weird skill you have, or something special that happened to you.
      Feel free to put links, images, whatever! 
      Don't worry about styling- we aren't grading you on this- it's just to get to know you better! :) 
      */}

      <div className="flex gap-4">
        <img src="/friendz.JPG" className="max-w-md h-auto rounded-lg" />
      </div>

      <div className="w-1/2 text-center"> 
        Hello! My name is Ezra, and I&apos;m a rising 4th year Computer Science major. 
        I was previously a part of GT Esports, where I was a coordinator and played for GT Valorant during my freshman year, 
        where we were flown out by Red Bull and played at the Georgia World Congress Center. 
        We also ran events such as GT Game Fest, Georgia Tech&apos;s BYOC LAN event. 
      </div>

      <div> 
        Some of my hobbies are hanging out with friends, traveling, taking pictures, and going to the gym. 
      </div>

      <div className="w-1/2 text-center"> 
        Something &quot;special&quot; that happened to me last year was that I broke my arm while arm wrestling at my friend&apos;s graduation party.
        I&apos;ve been trying to rehab and build the strength back up since... 
      </div>


      
    </div>
  );
}
