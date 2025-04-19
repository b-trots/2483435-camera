enum CameraCategory {
  PhotoCamera = 'Фотоаппарат',
  VideoCamera = 'Видеокамера',
}

enum CameraType {
  Collection = 'Коллекционная',
  Snapshot = 'Моментальная',
  Digital = 'Цифровая',
  Film = 'Плёночная',
}

enum CameraLevel {
  Zero = 'Нулевой',
  NonProfessional = 'Любительский',
  Professional = 'Профессиональный',
}

enum CameraParam {
  Article = 'Артикул',
  Category = 'Категория',
  Level = 'Уровень',
  Price = 'Цена',
  Rating = 'Рейтинг',
  ReviewCount = 'Всего оценок',
  Type = 'Тип камеры',
}

enum CameraCategoryId {
  PhotoCamera = 'photocamera',
  VideoCamera = 'videocamera',
}

enum CameraTypeId {
  Collection = 'collection',
  Snapshot = 'snapshot',
  Digital = 'digital',
  Film = 'film',
}

enum CameraLevelId {
  Zero = 'zero',
  NonProfessional = 'non-professional',
  Professional = 'professional',
}

export {
  CameraCategory,
  CameraType,
  CameraLevel,
  CameraParam,
  CameraCategoryId,
  CameraTypeId,
  CameraLevelId,
};
