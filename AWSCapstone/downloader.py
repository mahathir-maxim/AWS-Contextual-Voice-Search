"""Provides a :class:`Downloader` class for downloading SEC EDGAR filings."""

import sys
from pathlib import Path
from typing import ClassVar, List, Optional, Union

from _constants import DATE_FORMAT_TOKENS, DEFAULT_AFTER_DATE, DEFAULT_BEFORE_DATE
from _constants import SUPPORTED_FILINGS as _SUPPORTED_FILINGS
from _utils import (
    download_filings,
    get_filing_urls_to_download,
    get_number_of_unique_filings,
    is_cik,
    validate_date_format,
)


class Downloader:

    supported_filings: ClassVar[List[str]] = sorted(_SUPPORTED_FILINGS)

    def __init__(self, download_folder: Union[str, Path, None] = None) -> None:
        """Constructor for the :class:`Downloader` class."""
        if download_folder is None:
            self.download_folder = Path.cwd()
        elif isinstance(download_folder, Path):
            self.download_folder = download_folder
        else:
            self.download_folder = Path(download_folder).expanduser().resolve()

    def get(
        self,
        filing: str,
        ticker_or_cik: str,
        *,
        amount: Optional[int] = None,
        after: Optional[str] = None,
        before: Optional[str] = None,
        include_amends: bool = False,
        download_details: bool = True,
        query: str = "",
    ) -> int:
        
        ticker_or_cik = str(ticker_or_cik).strip().upper()

        # Check for blank tickers or CIKs
        if not ticker_or_cik:
            raise ValueError("Invalid ticker or CIK. Please enter a non-blank value.")

        # Detect CIKs and ensure that they are properly zero-padded
        if is_cik(ticker_or_cik):
            if len(ticker_or_cik) > 10:
                raise ValueError("Invalid CIK. CIKs must be at most 10 digits long.")
            # Pad CIK with 0s to ensure that it is exactly 10 digits long
            # The SEC Edgar Search API requires zero-padded CIKs to ensure
            # that search results are accurate. Relates to issue #84.
            ticker_or_cik = ticker_or_cik.zfill(10)

        if amount is None:
            # If amount is not specified, obtain all available filings.
            # We simply need a large number to denote this and the loop
            # responsible for fetching the URLs will break appropriately.
            amount = sys.maxsize
        else:
            amount = int(amount)
            if amount < 1:
                raise ValueError(
                    "Invalid amount. Please enter a number greater than 1."
                )

        # SEC allows for filing searches from 2000 onwards
        if after is None:
            after = DEFAULT_AFTER_DATE.strftime(DATE_FORMAT_TOKENS)
        else:
            validate_date_format(after)

            if after < DEFAULT_AFTER_DATE.strftime(DATE_FORMAT_TOKENS):
                raise ValueError(
                    f"Filings cannot be downloaded prior to {DEFAULT_AFTER_DATE.year}. "
                    f"Please enter a date on or after {DEFAULT_AFTER_DATE}."
                )

        if before is None:
            before = DEFAULT_BEFORE_DATE.strftime(DATE_FORMAT_TOKENS)
        else:
            validate_date_format(before)

        if after > before:
            raise ValueError(
                "Invalid after and before date combination. "
                "Please enter an after date that is less than the before date."
            )

        if filing not in _SUPPORTED_FILINGS:
            filing_options = ", ".join(self.supported_filings)
            raise ValueError(
                f"'{filing}' filings are not supported. "
                f"Please choose from the following: {filing_options}."
            )

        if not isinstance(query, str):
            raise TypeError("Query must be of type string.")

        filings_to_fetch = get_filing_urls_to_download(
            filing,
            ticker_or_cik,
            amount,
            after,
            before,
            include_amends,
            query,
        )

        download_filings(
            self.download_folder,
            ticker_or_cik,
            filing,
            filings_to_fetch,
            download_details,
        )

        # Get number of unique accession numbers downloaded
        return get_number_of_unique_filings(filings_to_fetch)