class CategoryController {
  constructor(categoryService) {
    this.categoryService = categoryService;
  }

  getAll = async (req, res) => {
    const categories = await this.categoryService.getAll();
    res.json(categories);
  };

  getById = async (req, res) => {
    const category = await this.categoryService.getById(req.params.id);
    category ? res.json(category) : res.status(404).json({ error: 'Não encontrado' });
  };

  create = async (req, res) => {
    try {
      const category = await this.categoryService.create(req.body);
      res.status(201).json(category);
    } catch (e) { res.status(400).json({ error: e.message }); }
  };

  update = async (req, res) => {
    const category = await this.categoryService.update(req.params.id, req.body);
    res.json(category);
  };

  delete = async (req, res) => {
    await this.categoryService.delete(req.params.id);
    res.status(204).send();
  };
}

module.exports = CategoryController;
