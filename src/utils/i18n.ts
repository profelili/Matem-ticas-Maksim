export type Language = 'es' | 'ru';

export interface Translations {
  // Brand & Nav
  appName: string;
  navAdventure: string;
  navTimeAttack: string;
  navLab: string;
  navMistakes: string;
  navStats: string;
  navLeaderboard: string;
  navAchievements: string;

  // Header & Controls
  levelLabel: string;
  streakLabel: string;
  daysLabel: string;
  soundOn: string;
  soundOff: string;
  lightMode: string;
  darkMode: string;
  installApp: string;
  installIos: string;
  dailyReminderTooltip: string;
  profileTooltip: string;
  changeLang: string;

  // Offline banner
  offlineTitle: string;
  offlineDesc: string;
  syncingMsg: string;
  syncedSuccess: string;
  onlineMsg: string;
  syncNow: string;

  // Common UI
  start: string;
  cancel: string;
  continue: string;
  retry: string;
  repeat: string;
  play: string;
  close: string;
  save: string;
  clear: string;
  score: string;
  accuracy: string;
  time: string;
  correct: string;
  incorrect: string;
  points: string;
  all: string;
  pending: string;
  solved: string;
  mastered: string;
  pts: string;

  // Math terms & Operations
  add: string;
  sub: string;
  mul: string;
  div: string;
  mixedOp: string;
  numLabel: string;
  denLabel: string;
  operation: string;
  result: string;
  simplifiedResult: string;
  stepByStepTitle: string;
  visualModelsTitle: string;
  circleModel: string;
  barModel: string;
  partsOf: string;
  wholes: string;
  tooManyParts: string;
  showVisual: string;
  hideVisual: string;

  // Difficulties
  basic: string;
  intermediate: string;
  advanced: string;
  expert: string;
  basico: string;
  intermedio: string;
  avanzado: string;
  experto: string;

  // Adventure View
  heroBadge: string;
  heroTitle: string;
  heroDesc: string;
  continueLevel: string;
  stars: string;
  quickTrainTitle: string;
  quickTrainDesc: string;
  levelsMapTitle: string;
  unlockedLevels: string;
  requiresStars: string;

  // Time Attack
  timeAttackTitle: string;
  timeAttackDesc: string;
  durationLabel: string;
  seconds60: string;
  seconds120: string;
  difficultyLabel: string;
  currentRecord: string;
  startTimeAttack: string;
  comboStreak: string;
  timeUpTitle: string;
  timeUpDesc: string;
  newRecord: string;
  finalScore: string;
  mistakesLogged: string;
  reviewNow: string;
  playAgain: string;
  changeOptions: string;

  // Lab View
  labTitle: string;
  labDesc: string;
  quickExamples: string;
  fraction1: string;
  fraction2: string;
  printOrSave: string;
  addFractionBtn: string;
  removeFractionBtn: string;
  fractionN: string;
  maxFractionsReached: string;
  saveCustomPreset: string;
  customPresetSaved: string;
  multiCommonDenomStep: string;
  multiExpansionStep: string;
  multiCombineStep: string;

  // Mistakes View
  mistakesTitle: string;
  mistakesDesc: string;
  pendingCount: string;
  solvedCount: string;
  filterOp: string;
  filterStatus: string;
  toReview: string;
  noMistakesPending: string;
  noMistakesDesc: string;
  yourAnswer: string;
  correctAnswer: string;
  reviewNowBtn: string;
  viewExplanation: string;
  hideExplanation: string;
  errorAnalysis: string;
  correctionProcedure: string;
  markAsMastered: string;

  // Analytics View
  analyticsTitle: string;
  analyticsDesc: string;
  totalSolved: string;
  globalAccuracy: string;
  bestStreak: string;
  maxScore: string;
  smartAdviceTitle: string;
  smartAdviceWeakest: string;
  tabAccuracyOp: string;
  tabEvolution: string;
  tabRadar: string;
  opBreakdownTitle: string;
  evolutionTitle: string;
  evolutionSubtitle: string;
  radarTitle: string;

  // Leaderboard View
  leaderboardTitle: string;
  leaderboardDesc: string;
  filterToday: string;
  filterWeek: string;
  filterAllTime: string;
  youBadge: string;

  // Achievements View
  rankTitleIniciado: string;
  rankTitleExplorador: string;
  rankTitleSabio: string;
  rankTitleMaestro: string;
  rankTitleCosmico: string;
  levelXpHeader: string;
  nextLevel: string;
  achievementsCount: string;
  unlocked: string;
  locked: string;
  avatarsTitle: string;
  equipped: string;

  // Profile Modal
  profilesTitle: string;
  profilesDesc: string;
  editProfile: string;
  newProfile: string;
  studentName: string;
  chooseAvatar: string;
  createProfileBtn: string;
  activeProfile: string;
  addNewStudent: string;

  // Reminder Modal
  reminderTitle: string;
  reminderDesc: string;
  browserPermission: string;
  permGranted: string;
  permDenied: string;
  permDefault: string;
  requestPermBtn: string;
  enableDailyReminder: string;
  reminderTimeLabel: string;
  testNotifBtn: string;
  saveConfig: string;

  // Gameplay Modal
  questionProgress: string;
  comboMultiplier: string;
  selectOption: string;
  manualInputMode: string;
  optionsMode: string;
  confirmAnswer: string;
  feedbackCorrect: string;
  feedbackCorrectDesc: string;
  feedbackWrong: string;
  feedbackWrongDesc: string;
}

export const translations: Record<Language, Translations> = {
  es: {
    appName: 'FraccionaMente',
    navAdventure: 'Aventura',
    navTimeAttack: 'Contrarreloj',
    navLab: 'Laboratorio',
    navMistakes: 'Cuaderno de Errores',
    navStats: 'Estadísticas',
    navLeaderboard: 'Clasificación',
    navAchievements: 'Logros',

    levelLabel: 'Nv.',
    streakLabel: 'Racha',
    daysLabel: 'd',
    soundOn: 'Sonido activado',
    soundOff: 'Sonido silenciado',
    lightMode: 'Modo claro',
    darkMode: 'Modo oscuro',
    installApp: 'Instalar App',
    installIos: 'Instalar en iOS',
    dailyReminderTooltip: 'Recordatorios diarios de estudio',
    profileTooltip: 'Ver y cambiar perfiles de usuario',
    changeLang: 'Cambiar idioma / Сменить язык',

    offlineTitle: 'Modo Offline Activo:',
    offlineDesc: 'Puedes jugar y aprender sin conexión. Tu progreso se guardará localmente.',
    syncingMsg: 'Sincronizando tus partidas y errores con la nube...',
    syncedSuccess: '¡Sincronización completada con éxito!',
    onlineMsg: 'Conexión en línea',
    syncNow: 'Sincronizar ahora',

    start: 'Comenzar',
    cancel: 'Cancelar',
    continue: 'Continuar',
    retry: 'Reintentar',
    repeat: 'Repetir',
    play: 'Jugar',
    close: 'Cerrar',
    save: 'Guardar',
    clear: 'Limpiar',
    score: 'Puntaje',
    accuracy: 'Precisión',
    time: 'Tiempo',
    correct: 'Correcto',
    incorrect: 'Incorrecto',
    points: 'Puntos',
    all: 'Todas',
    pending: 'Pendientes',
    solved: 'Superados',
    mastered: 'Dominado',
    pts: 'pts',

    add: 'Suma',
    sub: 'Resta',
    mul: 'Multiplicación',
    div: 'División',
    mixedOp: 'Mixta',
    numLabel: 'Numerador',
    denLabel: 'Denominador',
    operation: 'Operación',
    result: 'Resultado',
    simplifiedResult: 'Resultado simplificado:',
    stepByStepTitle: 'Procedimiento Matemático Paso a Paso',
    visualModelsTitle: 'Modelos Visuales Comparativos',
    circleModel: 'Círculos',
    barModel: 'Barras',
    partsOf: 'partes de',
    wholes: 'enteros',
    tooManyParts: 'Valores demasiado altos para graficar',
    showVisual: 'Ver modelo gráfico',
    hideVisual: 'Ocultar gráfico',

    basic: 'Básico',
    intermediate: 'Intermedio',
    advanced: 'Avanzado',
    expert: 'Experto',
    basico: 'Básico',
    intermedio: 'Intermedio',
    avanzado: 'Avanzado',
    experto: 'Experto',

    heroBadge: 'Aventura Matemática por Niveles',
    heroTitle: 'Domina las Fracciones Paso a Paso',
    heroDesc: 'Supera misiones interactivas con suma, resta, multiplicación y división. Conquista estrellas, desbloquea insignias y consolida tu comprensión conceptual con modelos visuales.',
    continueLevel: 'Continuar Nivel',
    stars: 'estrellas',
    quickTrainTitle: 'Entrenamiento Rápido por Operación',
    quickTrainDesc: 'Elige tu dificultad y practica la operación que necesites reforzar:',
    levelsMapTitle: 'Mapa de Niveles (1 al 15)',
    unlockedLevels: 'Desbloqueados',
    requiresStars: 'Requiere',

    timeAttackTitle: 'Reto Cronometrado',
    timeAttackDesc: 'Resuelve tantas operaciones de fracciones como puedas antes de que se agote el tiempo. Mantén la racha para multiplicar tus puntos.',
    durationLabel: 'Duración del reto:',
    seconds60: '60 Segundos',
    seconds120: '120 Segundos',
    difficultyLabel: 'Nivel de dificultad:',
    currentRecord: 'Tu Récord Actual:',
    startTimeAttack: 'Iniciar Reto Ahora',
    comboStreak: 'Racha Combo',
    timeUpTitle: '¡Tiempo Agotado!',
    timeUpDesc: 'Gran esfuerzo en este reto de velocidad.',
    newRecord: '🎉 ¡Nuevo Récord Personal!',
    finalScore: 'Puntaje Final',
    mistakesLogged: 'errores guardados en tu Cuaderno de Repaso.',
    reviewNow: 'Repasar ahora',
    playAgain: 'Jugar Otra Vez',
    changeOptions: 'Cambiar Opciones',

    labTitle: 'Laboratorio y Calculadora Visual',
    labDesc: 'Modifica cualquier numerador o denominador en tiempo real para ver cómo interactúan los modelos gráficos y el desglose paso a paso.',
    quickExamples: 'Ejemplos rápidos:',
    fraction1: 'Fracción 1',
    fraction2: 'Fracción 2',
    printOrSave: 'Imprimir resumen o guardar en PDF',
    addFractionBtn: '+ Agregar Fracción',
    removeFractionBtn: 'Eliminar fracción',
    fractionN: 'Fracción',
    maxFractionsReached: 'Máximo de 5 fracciones alcanzado',
    saveCustomPreset: 'Guardar como ejemplo rápido',
    customPresetSaved: '¡Fracción guardada en ejemplos!',
    multiCommonDenomStep: 'Calculamos el Mínimo Común Múltiplo (MCM) de todos los denominadores',
    multiExpansionStep: 'Convertimos cada fracción al denominador común',
    multiCombineStep: 'Realizamos las operaciones con los nuevos numeradores',

    mistakesTitle: 'Cuaderno de Repaso y Errores',
    mistakesDesc: 'Cada error es una oportunidad de aprendizaje. Revisa tus fallos anteriores, comprende el porqué con gráficos interactivos y vuélvelos a intentar.',
    pendingCount: 'Pendientes:',
    solvedCount: 'Superados:',
    filterOp: 'Operación:',
    filterStatus: 'Estado:',
    toReview: 'Por Repasar',
    noMistakesPending: '¡No tienes errores pendientes con este filtro!',
    noMistakesDesc: 'Continúa jugando en Aventura o Contrarreloj. Si en algún momento fallas una pregunta, aparecerá aquí con su explicación detallada.',
    yourAnswer: 'Tu respuesta:',
    correctAnswer: 'Correcta:',
    reviewNowBtn: 'Repasar ahora',
    viewExplanation: 'Ver explicación',
    hideExplanation: 'Ocultar explicación',
    errorAnalysis: 'Análisis del error:',
    correctionProcedure: 'Procedimiento de corrección:',
    markAsMastered: 'Marcar manualmente como dominado',

    analyticsTitle: 'Gráficos de Rendimiento y Progreso',
    analyticsDesc: 'Análisis personalizado de tu precisión matemática, evolución en el tiempo y dominio de habilidades.',
    totalSolved: 'Total Resueltos',
    globalAccuracy: 'Precisión Global',
    bestStreak: 'Racha Récord',
    maxScore: 'Puntaje Cronómetro',
    smartAdviceTitle: 'Recomendación de Estudio Personalizada',
    smartAdviceWeakest: 'Tu área con mayor margen de mejora es la',
    tabAccuracyOp: 'Precisión por Operación',
    tabEvolution: 'Evolución Temporal',
    tabRadar: 'Radar de Habilidades',
    opBreakdownTitle: 'Desglose de Rendimiento por Tipo de Operación',
    evolutionTitle: 'Evolución de Puntajes y Precisión por Sesión',
    evolutionSubtitle: 'Últimas 7 sesiones registradas',
    radarTitle: 'Medidor de Dominio de Competencias',

    leaderboardTitle: 'Tablero de Clasificación Global',
    leaderboardDesc: 'Compara tus marcas de velocidad, estrellas y rachas con la comunidad de estudiantes.',
    filterToday: 'Hoy',
    filterWeek: 'Esta Semana',
    filterAllTime: 'Histórico',
    youBadge: 'Tú',

    rankTitleIniciado: 'Iniciado de las Fracciones',
    rankTitleExplorador: 'Explorador Fraccionario',
    rankTitleSabio: 'Sabio de las Razones y Proporciones',
    rankTitleMaestro: 'Gran Maestro Matemático',
    rankTitleCosmico: 'Arquitecto Cósmico de Fracciones',
    levelXpHeader: 'Suma experiencia (XP) resolviendo misiones, superando retos contrarreloj y repasando errores.',
    nextLevel: 'Siguiente Nivel:',
    achievementsCount: 'Medallas y Logros',
    unlocked: 'Desbloqueado',
    locked: 'Bloqueado',
    avatarsTitle: 'Galería de Avatares Coleccionables',
    equipped: 'Equipado',

    profilesTitle: 'Perfiles de Estudiante',
    profilesDesc: 'Gestiona múltiples cuentas para guardar récords individuales.',
    editProfile: 'Editar Perfil Actual',
    newProfile: 'Crear Nuevo Perfil de Alumno',
    studentName: 'Nombre del alumno:',
    chooseAvatar: 'Elige un avatar:',
    createProfileBtn: 'Crear Perfil',
    activeProfile: 'Activo',
    addNewStudent: 'Añadir Nuevo Alumno',

    reminderTitle: 'Recordatorios Diarios',
    reminderDesc: 'Notificaciones push para estudiar y no perder tu racha.',
    browserPermission: 'Permiso del Navegador:',
    permGranted: 'Permitido',
    permDenied: 'Bloqueado',
    permDefault: 'Pendiente',
    requestPermBtn: 'Solicitar Permiso de Notificaciones',
    enableDailyReminder: 'Activar recordatorio diario:',
    reminderTimeLabel: 'Hora del recordatorio (formato 24h):',
    testNotifBtn: 'Probar notificación ahora',
    saveConfig: 'Guardar Configuración',

    questionProgress: 'Pregunta',
    comboMultiplier: 'Racha',
    selectOption: 'Selecciona la respuesta irreducible:',
    manualInputMode: 'Escribir fracción manualmente',
    optionsMode: 'Volver a opciones múltiples',
    confirmAnswer: 'Confirmar Respuesta',
    feedbackCorrect: '¡Excelente trabajo! Respuesta Correcta',
    feedbackCorrectDesc: 'Has aplicado correctamente la lógica de las fracciones.',
    feedbackWrong: 'Respuesta Incorrecta',
    feedbackWrongDesc: 'No te preocupes. Hemos guardado esta pregunta en tu Cuaderno de Errores para que puedas repasarla.',
  },
  ru: {
    appName: 'Интерактивные Дроби',
    navAdventure: 'Приключение',
    navTimeAttack: 'На время',
    navLab: 'Лаборатория',
    navMistakes: 'Тетрадь ошибок',
    navStats: 'Статистика',
    navLeaderboard: 'Рейтинг',
    navAchievements: 'Достижения',

    levelLabel: 'Ур.',
    streakLabel: 'Серия',
    daysLabel: 'дн',
    soundOn: 'Звук включен',
    soundOff: 'Звук выключен',
    lightMode: 'Светлая тема',
    darkMode: 'Темная тема',
    installApp: 'Установить',
    installIos: 'Установка на iOS',
    dailyReminderTooltip: 'Ежедневные напоминания для занятий',
    profileTooltip: 'Профили учеников',
    changeLang: 'Сменить язык / Cambiar idioma',

    offlineTitle: 'Офлайн режим активен:',
    offlineDesc: 'Вы можете играть и учиться без интернета. Прогресс сохраняется локально.',
    syncingMsg: 'Синхронизация данных с облаком...',
    syncedSuccess: 'Синхронизация успешно завершена!',
    onlineMsg: 'Подключение к сети',
    syncNow: 'Синхронизировать',

    start: 'Начать',
    cancel: 'Отмена',
    continue: 'Продолжить',
    retry: 'Повторить',
    repeat: 'Пройти снова',
    play: 'Играть',
    close: 'Закрыть',
    save: 'Сохранить',
    clear: 'Очистить',
    score: 'Очки',
    accuracy: 'Точность',
    time: 'Время',
    correct: 'Верно',
    incorrect: 'Неверно',
    points: 'Очки',
    all: 'Все',
    pending: 'Ожидают',
    solved: 'Решено',
    mastered: 'Освоено',
    pts: 'очк',

    add: 'Сложение',
    sub: 'Вычитание',
    mul: 'Умножение',
    div: 'Деление',
    mixedOp: 'Смешанные',
    numLabel: 'Числитель',
    denLabel: 'Знаменатель',
    operation: 'Операция',
    result: 'Результат',
    simplifiedResult: 'Упрощенный итоговый результат:',
    stepByStepTitle: 'Пошаговое математическое решение',
    visualModelsTitle: 'Сравнительные графические модели',
    circleModel: 'Круги',
    barModel: 'Полосы',
    partsOf: 'долей из',
    wholes: 'целых',
    tooManyParts: 'Значения слишком велики для визуализации',
    showVisual: 'Показать графическую модель',
    hideVisual: 'Скрыть модель',

    basic: 'Базовый',
    intermediate: 'Средний',
    advanced: 'Продвинутый',
    expert: 'Эксперт',
    basico: 'Базовый',
    intermedio: 'Средний',
    avanzado: 'Продвинутый',
    experto: 'Эксперт',

    heroBadge: 'Математическое приключение по уровням',
    heroTitle: 'Освойте дроби шаг за шагом',
    heroDesc: 'Выполняйте интерактивные миссии со сложением, вычитанием, умножением и делением. Зарабатывайте звезды, открывайте значки и развивайте наглядное понимание.',
    continueLevel: 'Продолжить Уровень',
    stars: 'звезд',
    quickTrainTitle: 'Быстрая тренировка по операциям',
    quickTrainDesc: 'Выберите сложность и практикуйте нужную операцию:',
    levelsMapTitle: 'Карта уровней (с 1 по 15)',
    unlockedLevels: 'Открыто',
    requiresStars: 'Требуется',

    timeAttackTitle: 'Испытание на время',
    timeAttackDesc: 'Решите как можно больше примеров с дробями до истечения таймера. Удерживайте серию верных ответов для комбо-множителя очков.',
    durationLabel: 'Время испытания:',
    seconds60: '60 Секунд',
    seconds120: '120 Секунд',
    difficultyLabel: 'Уровень сложности:',
    currentRecord: 'Ваш текущий рекорд:',
    startTimeAttack: 'Начать испытание',
    comboStreak: 'Комбо-серия',
    timeUpTitle: 'Время вышло!',
    timeUpDesc: 'Отличная тренировка скорости и устного счета.',
    newRecord: '🎉 Новый личный рекорд!',
    finalScore: 'Итоговый счет',
    mistakesLogged: 'ошибок сохранено в Тетради для повторения.',
    reviewNow: 'Повторить сейчас',
    playAgain: 'Сыграть еще раз',
    changeOptions: 'Изменить настройки',

    labTitle: 'Лаборатория и визуальный калькулятор',
    labDesc: 'Изменяйте числители и знаменатели в реальном времени, наблюдая за динамикой круговых и полосовых моделей и подробным решением.',
    quickExamples: 'Примеры:',
    fraction1: 'Дробь 1',
    fraction2: 'Дробь 2',
    printOrSave: 'Печать / Сохранить в PDF',
    addFractionBtn: '+ Добавить дробь',
    removeFractionBtn: 'Удалить дробь',
    fractionN: 'Дробь',
    maxFractionsReached: 'Достигнут максимум из 5 дробей',
    saveCustomPreset: 'Сохранить как пример',
    customPresetSaved: 'Пример сохранен в список!',
    multiCommonDenomStep: 'Находим наименьшее общее кратное (НОК) для всех знаменателей',
    multiExpansionStep: 'Приводим каждую дробь к общему знаменателю',
    multiCombineStep: 'Выполняем действия с новыми числителями',

    mistakesTitle: 'Тетрадь работы над ошибками',
    mistakesDesc: 'Каждая ошибка — ступень к мастерству. Разберите свои неточности с наглядными моделями и решите их повторно.',
    pendingCount: 'К повторению:',
    solvedCount: 'Освоено:',
    filterOp: 'Операция:',
    filterStatus: 'Статус:',
    toReview: 'Повторить',
    noMistakesPending: 'Ошибок в этом разделе нет!',
    noMistakesDesc: 'Продолжайте играть в Приключениях или Испытании на время. Все допущенные ошибки попадут сюда с пояснениями.',
    yourAnswer: 'Ваш ответ:',
    correctAnswer: 'Правильно:',
    reviewNowBtn: 'Повторить сейчас',
    viewExplanation: 'Показать решение',
    hideExplanation: 'Скрыть решение',
    errorAnalysis: 'Анализ ошибки:',
    correctionProcedure: 'Порядок исправления:',
    markAsMastered: 'Отметить как усвоенное вручную',

    analyticsTitle: 'Графики успеваемости и прогресса',
    analyticsDesc: 'Индивидуальный анализ точности решений, динамики во времени и радар ключевых математических навыков.',
    totalSolved: 'Всего решено',
    globalAccuracy: 'Общая точность',
    bestStreak: 'Рекордная серия',
    maxScore: 'Рекорд на время',
    smartAdviceTitle: 'Рекомендация по обучению',
    smartAdviceWeakest: 'Больше всего внимания стоит уделить теме',
    tabAccuracyOp: 'Точность по операциям',
    tabEvolution: 'Динамика по дням',
    tabRadar: 'Радар навыков',
    opBreakdownTitle: 'Анализ точности по видам математических операций',
    evolutionTitle: 'История результатов и точности по сессиям',
    evolutionSubtitle: 'Последние 7 сохраненных тренировок',
    radarTitle: 'Уровень владения математическими навыками',

    leaderboardTitle: 'Глобальная таблица лидеров',
    leaderboardDesc: 'Сравнивайте результаты скорости, заработанные звезды и серии с другими учениками.',
    filterToday: 'Сегодня',
    filterWeek: 'За неделю',
    filterAllTime: 'За все время',
    youBadge: 'Вы',

    rankTitleIniciado: 'Новичок в дробях',
    rankTitleExplorador: 'Исследователь дробей',
    rankTitleSabio: 'Знаток пропорций',
    rankTitleMaestro: 'Магистр математики',
    rankTitleCosmico: 'Архитектор дробей',
    levelXpHeader: 'Набирайте опыт (XP), проходя миссии, решая на время и разбирая ошибки.',
    nextLevel: 'Следующий уровень:',
    achievementsCount: 'Медали и достижения',
    unlocked: 'Открыто',
    locked: 'Заблокировано',
    avatarsTitle: 'Коллекция аватаров учеников',
    equipped: 'Выбран',

    profilesTitle: 'Профили учеников',
    profilesDesc: 'Создавайте отдельные учетные записи для раздельного сохранения рекордов.',
    editProfile: 'Редактировать профиль',
    newProfile: 'Создать новый профиль',
    studentName: 'Имя ученика:',
    chooseAvatar: 'Выберите аватар:',
    createProfileBtn: 'Создать профиль',
    activeProfile: 'Активный',
    addNewStudent: 'Добавить ученика',

    reminderTitle: 'Ежедневные напоминания',
    reminderDesc: 'Push-уведомления, чтобы не пропускать занятия и сохранять серию.',
    browserPermission: 'Разрешение браузера:',
    permGranted: 'Разрешено',
    permDenied: 'Заблокировано',
    permDefault: 'Требуется запрос',
    requestPermBtn: 'Запросить разрешение на уведомления',
    enableDailyReminder: 'Включить ежедневное напоминание:',
    reminderTimeLabel: 'Время напоминания (24ч):',
    testNotifBtn: 'Отправить тестовое уведомление',
    saveConfig: 'Сохранить настройки',

    questionProgress: 'Вопрос',
    comboMultiplier: 'Серия',
    selectOption: 'Выберите несократимый правильный ответ:',
    manualInputMode: 'Ввести дробь вручную',
    optionsMode: 'Вернуться к вариантам ответов',
    confirmAnswer: 'Подтвердить ответ',
    feedbackCorrect: 'Отличная работа! Ответ верный',
    feedbackCorrectDesc: 'Вы правильно применили математические правила работы с дробями.',
    feedbackWrong: 'Неверный ответ',
    feedbackWrongDesc: 'Ничего страшного. Этот пример сохранен в Тетради ошибок для закрепления.',
  },
};
