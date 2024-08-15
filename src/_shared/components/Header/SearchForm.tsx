/* eslint-disable react-hooks/exhaustive-deps */
import { SearchDto, searchDto } from "@/app/api/search/dto";
import { useForm } from "../Form/hooks/useForm";
import { Form, FormProps } from "../Form/components/Form";
import { SearchCombobox } from "../Form/components/Combobox";
import styled from "styled-components";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";
import { useFetch } from "@/_shared/libs/swr/fetcher";
import { useEffect, useRef, useState } from "react";
import Dialog from "../Dialog";
import { MovieWithCelebrities, MovieWithGenres } from "@/_shared/types/Movies";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
} from "@headlessui/react";
import { useRouter } from "next/navigation";
import { ResultsPanel } from "../ResultsPanel";
import {
  ActiveFilters,
  StyledFiltersButton,
  StyledFiltersPanel,
  StyledGenreCheckbox,
} from "./SearchFilters";
import FlexContainer from "../FlexContainer";
import Text from "../Text";
import { useGlobalStore } from "@/_shared/hooks/useGlobalStore";
import Checkbox from "../Form/components/Checkbox";
import { buildSearchQuery } from "@/_shared/utils/buildSearchParams";

const StyledForm: typeof Form = styled(Form)`
  order: 3;
  flex-grow: 1;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 12px;

  @media screen and (min-width: 1024px) {
    max-width: 30%;
  }

  @media screen and (min-width: 500px) {
    order: 0;
  }
`;

export default function SearchForm() {
  const { Field, ...form } = useForm({
    schema: searchDto,
    mode: "onChange",
  });

  const { genres } = useGlobalStore();

  const [search, setSearch] = useState<string>("");

  const timeout = useRef(setTimeout(() => {}, 0));

  useEffect(() => {
    const formSearch = form.getValues("search") ?? "";

    if (formSearch.length > 2) {
      clearTimeout(timeout.current);

      timeout.current = setTimeout(() => {
        setSearch(formSearch);
      }, 1000);
    }
  }, [form.watch("search")]);

  const { data, isLoading } = useFetch<MovieWithCelebrities[]>(
    buildSearchQuery(
      search,
      {
        start: form.watch("releaseDate.start") ?? null,
        end: form.watch("releaseDate.end") ?? null,
      },
      genres.filter((g) => form.watch(`genre.${g.name}`)).map((g) => g.id)
    )
  );

  function calculateFilters() {
    const genres = form.watch("genre")
      ? Object.values(form.watch("genre")).filter((g) => g).length
      : 0;
    const startDate = form.watch("releaseDate.start") ? 1 : 0;
    const endDate = form.watch("releaseDate.end") ? 1 : 0;
    return genres + startDate + endDate;
  }
  return (
    <StyledForm hform={form}>
      <Field name="search">
        <SearchCombobox loading={isLoading} data={data} />
      </Field>
      <Popover className="group">
        {calculateFilters() ? (
          <ActiveFilters filters={calculateFilters()} />
        ) : null}
        <StyledFiltersButton className="flex items-center gap-2">
          <AdjustmentsHorizontalIcon height={24} width={24} />
        </StyledFiltersButton>
        <StyledFiltersPanel anchor={{ to: "bottom end", gap: 8 }}>
          <Text size={12} $weight={500} $color={"rgba(238, 238, 238, 1)"}>
            Gêneros Cinematográficos
          </Text>
          <FlexContainer $wrap="wrap" $gap={8}>
            {genres
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((g) => (
                <Field
                  style={{ width: "auto" }}
                  key={g.id}
                  name={`genre.${g.name}`}
                >
                  <Checkbox $pill>{g.name}</Checkbox>
                </Field>
              ))}
          </FlexContainer>
        </StyledFiltersPanel>
      </Popover>
    </StyledForm>
  );
}
