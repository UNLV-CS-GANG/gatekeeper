import { ContactDecoration } from '@/components/Contact/Contact-decoration'

export default function Contact() {
  return (
    <>
      <section className="relative z-10 flex justify-center overflow-hidden bg-white py-20 lg:py-[120px] ">
        <div className="container max-w-7xl">
          <div className="-mx-4 flex flex-wrap lg:justify-between">
            {/* Left card */}
            <div className="w-full px-4 lg:w-1/2 xl:w-6/12">
              <div className="mb-12 max-w-[570px] lg:mb-0">
                <span className="text-black mb-4 block text-base font-semibold">Contact Form</span>
                <h2 className="text-dark mb-6 text-[32px] font-bold uppercase sm:text-[40px] lg:text-[36px] xl:text-[40px]">
                  GET IN TOUCH WITH US
                </h2>
                <p className="text-body-color mb-9 text-base leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eius tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim adiqua minim veniam quis nostrud exercitation ullamco
                </p>
              </div>
            </div>
            {/* Right card */}
            <div className="w-full px-4 lg:w-1/2 xl:w-5/12">
              <div className="relative rounded-lg bg-white p-8 shadow-lg sm:p-12">
                <form>
                  <div className="mb-6">
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="text-body-color focus:border-primary w-full rounded border border-[f0f0f0] px-[14px] py-3 text-base outline-none focus-visible:shadow-none"
                    />
                  </div>
                  <div className="mb-6">
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="text-body-color focus:border-primary w-full rounded border border-[f0f0f0] px-[14px] py-3 text-base outline-none focus-visible:shadow-none"
                    />
                  </div>
                  <div className="mb-6">
                    <input
                      type="text"
                      placeholder="Your Phone"
                      className="text-body-color focus:border-primary w-full rounded border border-[f0f0f0] px-[14px] py-3 text-base outline-none focus-visible:shadow-none"
                    />
                  </div>
                  <div className="mb-6">
                    <textarea
                      rows={6}
                      placeholder="Your Message"
                      className="text-body-color focus:border-primary w-full resize-none rounded border border-[f0f0f0] px-[14px] py-3 text-base outline-none focus-visible:shadow-none
                        "
                    ></textarea>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="bg-blue-600 w-full rounded border p-3 text-white transition hover:bg-opacity-90"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
                <ContactDecoration />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
