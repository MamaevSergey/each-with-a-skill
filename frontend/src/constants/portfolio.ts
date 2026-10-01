import type { CSSProperties } from 'react';

export const PEN_ICON = 'https://storage.yandexcloud.net/myfirstbucket/pen-square-svgrepo-com.svg';
export const ERR_CLASS = '!ring-2 !ring-red-500 !border-red-500';

export const GRADIENT_BTN_STYLE: CSSProperties = {
    background: 'linear-gradient(80.53deg, #224EFF -85.94%, #F53DFF 206.59%)',
};

export const PROFILE_ROLES = [
    'Product Owner',
    'Project Manager',
    'System Analyst',
    'Team Lead',
    'Frontend Developer',
    'Backend Developer',
    'UI/UX Designer',
];

export const EXP_ROLES = [
    'Product Owner',
    'Project Manager',
    'Scrum Master/Agile Coach',
    'Account Manager',
    'Business Analyst',
    'System Analyst',
    'Team Lead',
    'Frontend Developer',
    'Backend Developer',
    'Mobile Developer',
    'DevOps Engineer',
    'UI/UX Designer',
    'QA Engineer',
];

export const EXP_TECHNOLOGIES = [
    // Frontend
    'JavaScript', 'TypeScript', 'React.js', 'Vue.js', 'Angular', 'Svelte', 'SolidJS', 'Qwik',
    'Next.js', 'Nuxt.js', 'Remix', 'Astro', 'SvelteKit', 'HTML', 'CSS', 'Tailwind CSS', 'Sass/SCSS',
    'Styled Components', 'Bootstrap', 'Vite', 'Webpack', 'Turbo', 'Rollup', 'Redux Toolkit',
    'Zustand', 'MobX', 'Effector',
    // Backend
    'Node.js', 'Express.js', 'NestJS', 'Fastify', 'Koa', 'Python', 'Python: Django', 'Python: FastAPI',
    'Python: Flask', 'PHP', 'PHP: Laravel', 'PHP: Symfony', 'PHP: Yii2', 'Java', 'Java: Spring Boot',
    'Java:Quarkus', 'Java: Micronaut', 'C#', 'C#: ASP.NET Core', 'C#: Blazor', 'GoLang', 'GoLang: Gin',
    'GoLang: Fiber', 'GoLang: Echo', 'Ruby', 'Ruby: Ruby on Rails', 'Rust', 'Rust: Actix-web', 'Rust: Axum',
    // Database
    'PostgreSQL', 'MySQL', 'SQLite', 'MS SQL Server', 'MongoDB', 'Redis', 'Cassandra', 'CouchDB',
    'Elasticsearch', 'Opensearch', 'Meilisearch', 'Prisma', 'TypeORM', 'Sequelize', 'Mongoose', 'SQLAlchemy',
    // Mobile
    'Flutter', 'React Native', 'Ionic', 'Multiplatform (KMP)', 'Swift (iOS)', 'Kotlin / Java (Android)',
    // DevOps
    'Docker', 'Podman', 'Kubernetes', 'GitHub Actions', 'GitLab CI/CD', 'Jenkins', 'TeamCity', 'Terraform',
    'Ansible', 'AWS', 'Microsoft Azure', 'Google Cloud', 'Cloudflare', 'Yandex Cloud', 'Nginx', 'Apache', 'Caddy',
    // AI / Data
    'PyTorch', 'TensorFlow', 'Scikit Learn', 'Keras', 'OpenAI API', 'LangChain', 'LlamaIndex', 'Hugging Face',
    'Pandas', 'NumPy', 'Jupyter', 'Notebooks', 'Apache Spark', 'Hadoop', 'ClickHouse',
];

export const STACK_ICON_IDS = [
    'Python', 'SASS', 'Electron', 'TailwindCSS', 'HTML', 'Docker', 'React', 'TypeScript',
    'PHP', 'MySQL', 'NestJS', 'JavaScript', 'Vue.js', 'Angular', 'NuxtJS',
];

export const stackIconSrc = (id: string) => `https://storage.yandexcloud.net/myfirstbucket/${id}.svg`;