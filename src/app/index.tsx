import { Component } from "react";
import sadge from "../assets/sadge.gif";
import lmao from "../assets/lmao.png";
import "./styles.css";

type State = Profile & {
  loading: boolean;
  error: boolean;
  repos: Repository[];
};

export default class App extends Component<unknown, State> {
  state: State = {
    avatar_url: "",
    bio: "",
    company: "https://www.fullstacklabs.co/",
    email: "henriquetmkato@gmail.com",
    html_url: "",
    location: "",
    name: "",
    repos: [],
    repos_url: "",
    loading: true,
    error: false,
  };

  async componentDidMount() {
    try {
      const profile_req = await fetch(import.meta.env.VITE_PROFILE_URL);
      const { email, company, ...profile }: Profile = await profile_req.json();
      if (profile_req.status !== 200) throw Error();

      const repos_req = await fetch(profile.repos_url);
      const repos: Repository[] = await repos_req.json();
      if (repos_req.status !== 200) throw Error();

      this.setState(profile);
      this.setState({ repos });
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ loading: false, error: true });
    }
  }

  render() {
    const {
      avatar_url,
      bio,
      company,
      email,
      html_url,
      location,
      name,
      repos,
      loading,
      error,
    } = this.state;

    return loading || error ? (
      <div className="h-screen w-screen flex flex-col items-center justify-center">
        {error ? (
          <>
            <img src={sadge} />
            <p>oops</p>
          </>
        ) : (
          <p className="font-mono">
            &uarr; &uarr; &darr; &darr; &larr; &rarr; &larr; &rarr; A B
          </p>
        )}
      </div>
    ) : (
      <>
        <header className="flex gap-x-12 items-center">
          <img
            src={avatar_url}
            alt={`${name}'s avatar`}
            className="rounded-full shadow-2xl w-[240px]"
          />
          <div className="font-mono leading-8">
            <h1 className="text-5xl font-bold">{name}</h1>
            <hr className="my-8 border-emerald-400" />
            <p>
              <i>{bio}</i>
            </p>
            <p>
              Working @&nbsp;
              <a href={company} rel="noreferrer noopener" target="_blank">
                FullStack Labs
              </a>
            </p>
            <p>
              <a
                href="https://www.linkedin.com/in/henrikato/"
                rel="noreferrer noopener"
                target="_blank"
              >
                LinkedIn
              </a>
            </p>
            <p>
              <a href={`mailto:${email}`}>E-mail</a>
            </p>
            <p>
              <a href={html_url} rel="noreferrer noopener" target="_blank">
                Github
              </a>
            </p>
            <p>{location}</p>
          </div>
        </header>
        <main className="mt-8">
          <h1 className="text-4xl font-semibold">Projetos</h1>
          <div className="lg:w-1/2 mt-4 divide-y">
            {repos.map(({ description, html_url, name }, id) => (
              <div key={id} className="block p-4">
                <p className="text-2xl font-semibold">{name}</p>
                <p>{description}</p>
                <a
                  href={html_url}
                  rel="noreferrer noopener"
                  className="inline-block text-white bg-emerald-700 rounded py-1 px-2 mt-4 self-center"
                  target="_blank"
                >
                  Ir para o projeto
                </a>
              </div>
            ))}
          </div>
        </main>
        <footer className="mt-12 flex items-center justify-center">
          <img src={lmao} alt="lmao" />
        </footer>
      </>
    );
  }
}
