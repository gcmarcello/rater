// client
"use client";

import {
  ComboboxOption,
  ComboboxOptions,
  Combobox as HeadlessCombobox,
  ComboboxInput as HeadlessComboboxInput,
  InputProps as HeadlessInputProps,
} from "@headlessui/react";
import {
  CheckIcon,
  ChevronUpDownIcon,
  MagnifyingGlassIcon,
  XCircleIcon,
} from "@heroicons/react/20/solid";
import {
  useState,
  useMemo,
  useRef,
  useEffect,
  Fragment,
  useCallback,
  forwardRef,
} from "react";
import { getEntryFromPath } from "../functions/getEntryFromPath";
import { useField } from "../hooks/useField";
import { Controller, Path } from "react-hook-form";
import { useFormContext } from "../context/form.ctx";
import styled from "styled-components";
import { InputProps, StyledInput } from "./Input";
import { Celebrity, Movie } from "@prisma/client";
import { MovieWithCelebrities, MovieWithGenres } from "@/_shared/types/Movies";
import dayjs from "dayjs";
import Text from "../../Text";
import FlexContainer from "../../FlexContainer";
import { CelebMediaCard } from "../../CelebrityPage/CelebMediaCard";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SearchDto } from "@/app/api/search/dto";
import Image from "next/image";
import { Section } from "../../MainPage/Section";
import { Spinner } from "../../Spinner";

export interface SelectOption<T = any> {
  id: string;
  displayValue: string;
  value: string;
  _?: T;
  disabled?: boolean;
}

export interface SelectProps<Data> {
  data: Data[] | [];
  displayValueKey: Path<Data>;
  valueKey?: Path<Data>;
  onChange?: (value: Data | undefined) => void;
}

const StyledComboboxContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
`;

const StyledComboboxInput: typeof HeadlessComboboxInput = styled(
  HeadlessComboboxInput
)`
  padding-left: 48px;
  background-color: rgba(25, 25, 25, 1);
  color: #eeeeee;
  border-radius: 99px;
  border: none;
  height: 48px;
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-weight: 400;
  flex-grow: 1;

  &:disabled {
    color: #585858;
  }
`;

const StyledSearchIcon = styled(MagnifyingGlassIcon)`
  position: absolute;
  height: 100%;
  width: 40px;
  height: 40px;
  padding: 6px;
  top: 4px;
  left: 4px;
  border-radius: 99px;
  z-index: 999;
  cursor: pointer;
  color: white;
  background-color: rgba(35, 35, 35, 1);
`;

const StyledComboboxButton = styled.div`
  position: relative;
`;

const StyledComboboxOptions: typeof ComboboxOptions = styled(ComboboxOptions)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 12px;
  gap: 12px;
  width: max(var(--input-width), 327px);
  margin-left: 22px;
  margin-top: 8px;

  left: 0px;

  background: #191919;
  border-radius: 24px;

  flex: none;
  order: 2;
  flex-grow: 0;
  z-index: 20;

  @media screen and (min-width: 500px) {
    margin-left: 0px;
  }
`;

const StyledComboboxOption: typeof ComboboxOption = styled(ComboboxOption)`
  cursor: pointer;
  width: 100%;
  padding: 8px;
  border-radius: 8px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const EmptyOptions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100px;
  width: 100%;
`;

const Backdrop = styled.div`
  position: fixed;
  top: 90;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100dvw;
  height: calc(100dvh - 136px);
  z-index: 1;

  @media screen and (min-width: 500px) {
    height: calc(100dvh - 88px);
  }
`;

export function SearchCombobox({
  data,
  className,
  onChange,
  loading,
  type = "text",
  icon,
  ...props
}: {
  data?: MovieWithCelebrities[];
  loading?: boolean;
  icon?: React.ReactNode;
} & HeadlessInputProps &
  InputProps) {
  const form = useFormContext();
  const router = useRouter();
  const { name } = useField();

  function handleNavigation(data: MovieWithCelebrities | Celebrity) {
    if (!data) return;
    if ("title" in data) {
      window.location.href = `/filme/${data.id}`;
    }
    if ("name" in data) {
      window.location.href = `/celebridade/${data.id}`;
    }
  }

  return (
    <>
      <Controller
        name={name}
        control={form.control}
        render={({ field: { onChange: fieldOnChange, value, ..._field } }) => (
          <StyledComboboxContainer>
            <HeadlessCombobox
              immediate
              onChange={(data) =>
                handleNavigation(data as MovieWithCelebrities)
              }
            >
              {({ open }) => (
                <>
                  {open && <Backdrop />}
                  <StyledComboboxInput
                    autoComplete="off"
                    onChange={(e: any) => {
                      const value = (e.target as any)?.value;
                      onChange && onChange(value);
                      fieldOnChange(type === "number" ? Number(value) : value);
                    }}
                  />
                  <StyledSearchIcon>
                    <StyledComboboxButton>
                      <MagnifyingGlassIcon height={24} width={24} />
                    </StyledComboboxButton>
                  </StyledSearchIcon>

                  <StyledComboboxOptions anchor="bottom">
                    {data?.length ? (
                      <>
                        <Text
                          size={12}
                          $weight={500}
                          $color={"rgba(238, 238, 238, 1)"}
                        >
                          Resultados
                        </Text>
                        {data?.map((data) => (
                          <StyledComboboxOption value={data} key={data.id}>
                            <FlexContainer $gap={8}>
                              <CelebMediaCard $image={data.options?.poster} />
                              <FlexContainer $direction="column" $gap={2}>
                                <FlexContainer $align="center" $gap={4}>
                                  <Text size={13}>{data.title}</Text>{" "}
                                  <Image
                                    src={"/fullstar.svg"}
                                    alt="star"
                                    width={14}
                                    height={14}
                                  />
                                </FlexContainer>
                                <Text $variant="gray" size={13} $weight={500}>
                                  {dayjs(data.releaseDate).format("YYYY")}
                                </Text>
                                <Text $variant="gray" size={13} $weight={500}>
                                  {data?.celebrities
                                    ?.map((celeb) => celeb.name)
                                    .join(", ")}
                                </Text>
                              </FlexContainer>
                            </FlexContainer>
                          </StyledComboboxOption>
                        ))}
                        {data
                          ?.flatMap((c) => c.celebrities)
                          ?.map((data) => (
                            <StyledComboboxOption value={data} key={data.id}>
                              <FlexContainer $gap={8}>
                                <CelebMediaCard $image={data?.options?.image} />
                                <Text size={13}>{data.name}</Text>
                              </FlexContainer>
                            </StyledComboboxOption>
                          ))}
                      </>
                    ) : (
                      <EmptyOptions>
                        {loading ? (
                          <Spinner />
                        ) : data?.length === 0 ? (
                          <Text>Nenhum Resultado Encontrado</Text>
                        ) : (
                          <Text>Procure um filme!</Text>
                        )}
                      </EmptyOptions>
                    )}
                  </StyledComboboxOptions>
                </>
              )}
            </HeadlessCombobox>
          </StyledComboboxContainer>
        )}
      />
    </>
  );
}
