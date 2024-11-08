import React from 'react'
import { SwiperSlide, Swiper } from 'swiper/react'
import Image from 'next/image'
import Link from 'next/link'
import { Github, Linkedin } from 'lucide-react'
import { Pagination, Autoplay, FreeMode } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'
import 'swiper/css/free-mode'

const teamMembers = [
    { name: "Eshwari Kangutkar", role: "Developer", image: "/assets/img/team/eshwari.png", github: "https://github.com/EshwariK", linkedin: "https://www.linkedin.com/in/eshwari-kangutkar" },
    { name: "Roshita Shakya", role: "Developer", image: "/assets/img/team/roshita.jpg", github: "https://github.com/roshita02", linkedin: "https://www.linkedin.com/in/roshitashk/" },
    { name: "Omkar Mirgal", role: "Developer", image: "/assets/img/team/omkar.jpeg", github: "https://github.com/OmkarMirgal", linkedin: "https://www.linkedin.com/in/omkar-mirgal-19a959227/" },
    { name: "Toushika Islam", role: "Developer", image: "/assets/img/team/toushika.jpeg", github: "https://github.com/Toushika", linkedin: "https://www.linkedin.com/in/toushika-islam-38a7323b/" },
    { name: "Shrushti Sakala", role: "Developer", image: "/assets/img/team/shrushti.jpeg", github: "https://github.com/ShrushtiSakala/", linkedin: "https://www.linkedin.com/in/shrushtisakala" },
]

export const Team_swiper = () => {
  return (
    <section id="team" className="py-8 xs:py-12 md:py-16 lg:py-24 bg-background">
      <div className="container">
        <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 xs:mb-8 md:mb-12 text-foreground">
          Meet Our Team
        </h2>
        <div className="relative px-4 sm:px-6 lg:px-8">
          <Swiper
            modules={[Autoplay, FreeMode]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            freeMode={{
              enabled: true,
              momentum: true,
              momentumRatio: 1,
              momentumBounce: true,
              momentumBounceRatio: 1,
              sticky: true,
            }}
            grabCursor={true}
            loop={true}
            className="team-swiper !overflow-visible"
          >
            {teamMembers.map((member, index) => (
              <SwiperSlide key={index} className="!h-auto">
                <div className="bg-card rounded-lg p-6 shadow-lg h-full">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative w-40 h-40 md:w-48 md:h-48 mb-6 squircle-mask">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 160px, 192px"
                        priority
                      />
                    </div>
                    <h3 className="text-xl font-semibold">{member.name}</h3>
                    <p className="text-muted-foreground mt-1">{member.role}</p>
                    
                    <div className="mt-4 flex gap-4">
                      <Link 
                        href={member.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:scale-110 transition-transform duration-200"
                      >
                        <Github className="h-6 w-6 text-foreground hover:text-primary transition-colors" />
                      </Link>
                      <Link 
                        href={member.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:scale-110 transition-transform duration-200"
                      >
                        <Linkedin className="h-6 w-6 text-foreground hover:text-primary transition-colors" />
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}
