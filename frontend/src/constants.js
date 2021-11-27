export const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000"
    : "https://microsoft-engage-2021.herokuapp.com";

export const publicURL = "https://microsoft-engage-2021.ml";

export const languages = [
  { key: "C", value: "C" },
  { key: "C++", value: "CPP" },
  { key: "C++11", value: "CPP11" },
  { key: "C++14", value: "CPP14" },
  { key: "Clojure", value: "CLOJURE" },
  { key: "C#  CSHARP" },
  { key: "Go", value: "GO" },
  { key: "Haskell", value: "HASKELL" },
  { key: "Java", value: "JAVA" },
  { key: "Java 8", value: "JAVA8" },
  { key: "JavaScript(Rhino)", value: "JAVASCRIPT" },
  { key: "JavaScript(Nodejs)", value: "JAVASCRIPT_NODE" },
  { key: "Kotlin", value: "KOTLIN" },
  { key: "Objective C", value: "OBJECTIVEC" },
  { key: "Pascal", value: "PASCAL" },
  { key: "Perl", value: "PERL" },
  { key: "PHP", value: "PHP" },
  { key: "Python 2", value: "PYTHON" },
  { key: "Python 3", value: "PYTHON3" },
  { key: "R", value: "R" },
  { key: "Ruby", value: "RUBY" },
  { key: "Rust", value: "RUST" },
  { key: "Scala SCALA" },
  { key: "Swift", value: "SWIFT" },
  { key: "Swift 4.1", value: "SWIFT_4_1" },
];

export const languagesMap = {
  ...Object.fromEntries(
    languages.map((language) => [language.key, language.value])
  ),
  ...{
    CPP11: "cpp",
    CPP14: "cpp",
    CLOJURE: "coljure",
    JAVA8: "java",
    JAVASCRIPT_NODE: "javascript",
    PYTHON3: "python",
    SWIFT_4_1: "swift",
  },
};
