class ProductController {
  constructor(productService) {
    this.productService = productService;
  }

  getAll = async (req, res) => {
    const products = await this.productService.getAll();
    res.json(products);
  };

  getById = async (req, res) => {
    const product = await this.productService.getById(req.params.id);
    product ? res.json(product) : res.status(404).json({ error: "Não encontrado" });
  };

  getByCategory = async (req, res) => {
    const products = await this.productService.getByCategory(req.params.id);
    res.json(products);
  };

  getByName = async (req, res) => {
    const products = await this.productService.getByName(req.query.name);
    res.json(products);
  };

  getByPrice = async (req, res) => {
    const products = await this.productService.getByPrice(req.params.price);
    res.json(products);
  };

  getBySize = async (req, res) => {
    const products = await this.productService.getBySize(req.params.size);
    res.json(products);
  };

  create = async (req, res) => {
    try {
      const product = await this.productService.create(req.body);
      res.status(201).json(product);
    } catch (e) { res.status(400).json({ error: e.message }); }
  };

  update = async (req, res) => {
    const product = await this.productService.update(req.params.id, req.body);
    res.json(product);
  };

  delete = async (req, res) => {
    await this.productService.delete(req.params.id);
    res.status(204).send();
  };
}

module.exports = ProductController;
