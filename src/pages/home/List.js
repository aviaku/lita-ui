import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import Countdown from "react-countdown";
import CardModal from "./CardModal";
import { AiOutlineHeart } from "react-icons/ai";
import CollectionLoader from "components/Loader/CollectionLoader";
import nft5 from "../../assets/images/nft/nft5.png";
import userIcon from "../../assets/images/avatar/userIcon.png";

import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import { useIPFS } from "hooks/useIPFS";

const List = (props) => {
  const { resolveLink } = useIPFS();
  console.log("propsss", props);
  const data = props.data;
  const title = props.title;
  const market = props.market;

  const [modalShow, setModalShow] = useState(false);

  return (
    <Fragment>
      <section className="tf-section today-pick pt-2">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="">
                <h2 className="tf-title">{title}</h2>
                <div className="heading-line"></div>
              </div>
            </div>
            <div className="col-md-12">
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={30}
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                  },
                  767: {
                    slidesPerView: 2,
                  },
                  991: {
                    slidesPerView: 3,
                  },
                  1300: {
                    slidesPerView: 4,
                  },
                }}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
              >
                {data && data.length > 0 ? (
                  data.map((item, index) => {
                    console.log("uer", item);

                    return (
                      <SwiperSlide key={index}>
                        <div className="swiper-container show-shadow carousel auctions">
                          <div className="swiper-wrapper">
                            <div className="swiper-slide">
                              <div className="slider-item">
                                <Link
                                  to={`/collection/${item.collectionAddress}`}
                                >
                                  <div className="sc-card-product">
                                    <div className="sc-card-top-box d-flex justify-content-between">
                                      <div className="d-flex align-items-center">
                                        <img
                                          className="sc-card-img"
                                          src={userIcon}
                                        />
                                        <div>
                                          <p className="mb-0 gilroy-normal font-13 line-height creator">
                                            Symbol
                                          </p>
                                          <h5 className="gilroy-semibold font-15">
                                            {item?.gameInfo
                                              ?.primary_asset_contracts?.[0]
                                              ?.symbol ||
                                              item?.gameInfo?.symbol}
                                          </h5>
                                        </div>
                                      </div>
                                      <div className="d-flex justify-content-end align-items-center likes">
                                        <AiOutlineHeart className="font-14 icon me-1" />
                                        <p className="font-13 m-0">
                                          {item.likes ? item.likes : 0}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="card img-div">
                                      <img
                                        style={{
                                          maxHeight: "220px",
                                          minHeight: "220px",
                                        }}
                                        src={
                                          resolveLink(
                                            item?.gameInfo
                                              ?.primary_asset_contracts?.[0]
                                              ?.image_url,
                                          ) ||
                                          resolveLink(
                                            item?.gameInfo?.meta?.content[0]
                                              ?.url,
                                          )
                                        }
                                      />
                                    </div>
                                    <div
                                      className="sc-product-footer"
                                      style={{ padding: "20px 40px 20px" }}
                                    >
                                      <h5 className="gilroy-bold ellipsis">
                                        {item?.gameInfo?.name ||
                                          item?.gameInfo?.meta?.name}
                                      </h5>
                                    </div>
                                  </div>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    );
                  })
                ) : (
                  <span style={{ color: "grey" }}>No Data</span>
                )}
              </Swiper>
            </div>
          </div>
        </div>
      </section>
      <CardModal show={modalShow} onHide={() => setModalShow(false)} />
    </Fragment>
  );
};

List.propTypes = {
  data: PropTypes.array.isRequired,
};

export default List;
