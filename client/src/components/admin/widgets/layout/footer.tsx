import PropTypes, { Validator } from "prop-types";
import { Typography } from "@material-tailwind/react";
import { HeartIcon } from "@heroicons/react/24/solid";

interface Route {
  name: string;
  path: string;
}

interface FooterProps {
  brandName?: string;
  brandLink?: string;
  routes?: Route[] | null;
}

export function Footer({ brandName, brandLink, routes }: FooterProps) {
  const year = new Date().getFullYear();
  const defaultRoutes: Route[] = [
    { name: "Creative Tim", path: "https://www.creative-tim.com" },
    { name: "About Us", path: "https://www.creative-tim.com/presentation" },
    { name: "Blog", path: "https://www.creative-tim.com/blog" },
    { name: "License", path: "https://www.creative-tim.com/license" },
  ];

  return (
    <footer className="py-2">
      <div className="flex w-full flex-wrap items-center justify-center gap-6 px-2 md:justify-between">
        <Typography variant="small" className="font-normal text-inherit">
          &copy; {year}, made with{" "}
          <HeartIcon className="-mt-0.5 inline-block h-3.5 w-3.5" /> by{" "}
          {brandLink ? (
            <a
              href={brandLink}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-blue-500"
            >
              {brandName}
            </a>
          ) : (
            <span>{brandName}</span>
          )}{" "}
          for a better web.
        </Typography>
        <ul className="flex items-center gap-4">
          {(routes ?? defaultRoutes).map(({ name, path }) => (
            <li key={name}>
              <Typography
                as="a"
                href={path}
                target="_blank"
                rel="noopener noreferrer"
                variant="small"
                className="py-0.5 px-1 font-normal text-inherit transition-colors hover:text-blue-500"
              >
                {name}
              </Typography>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

Footer.defaultProps = {
  brandName: "Creative Tim",
  brandLink: "https://www.creative-tim.com",
};

Footer.propTypes = {
  brandName: PropTypes.string,
  brandLink: PropTypes.string,
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    }) as Validator<Route>
  ),
};

Footer.displayName = "/src/widgets/layout/footer.jsx";

export default Footer;
