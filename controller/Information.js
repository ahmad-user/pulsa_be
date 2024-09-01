const Banner = require("../models/BannerModels.js");
const Service = require("../models/ServiceModels.js");

// POST BANNER
const TambahBanner = async (req, res) => {
  const { banner_name, banner_image, description } = req.body;
  try {
    await Banner.create({
      banner_name: banner_name,
      banner_image: banner_image,
      description: description,
    });
    res.status(200).json({
      status: 0,
      message: "Tambah Banner Berhasil",
      data: null,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 102,
      message: "Terjadi Kesalahan Pada Server",
      data: null,
    });
  }
};

// GET SERVICE
const getBanner = async (req, res) => {
  try {
    const banners = await Banner.findAll();
    res.status(200).json({
      status: 0,
      message: "Sukses",
      data: banners.map((banner) => ({
        banner_name: banner.banner_name,
        banner_image: banner.banner_image,
        description: banner.description,
      })),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 102,
      message: "Terjadi Kesalahan Pada Server",
      data: null,
    });
  }
};

// POST SERVICE
const TambahService = async (req, res) => {
  const { service_code, service_name, service_icon, service_tarif } = req.body;
  try {
    await Service.create({
      service_code: service_code,
      service_name: service_name,
      service_icon: service_icon,
      service_tarif: service_tarif,
    });
    res.status(200).json({
      status: 0,
      message: "Tambah Service Berhasil",
      data: null,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 102,
      message: "Terjadi Kesalahan Pada Server",
      data: null,
    });
  }
};

// GET SERVICE
const getService = async (req, res) => {
  try {
    const services = await Service.findAll();

    res.status(200).json({
      status: 0,
      message: "Sukses",
      data: services.map((services) => ({
        service_code: services.service_code,
        service_name: services.service_name,
        service_icon: services.service_icon,
        service_tarif: services.service_tarif,
      })),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 102,
      message: "Terjadi Kesalahan Pada Server",
      data: null,
    });
  }
};

module.exports = {
  TambahBanner,
  getBanner,
  TambahService,
  getService,
};
